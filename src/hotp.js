import jsSHA from 'jssha';

function Hotp(length = 6) {

    this.length = length;

    if (this.length > 8 || this.length < 6) {
        throw "Error: invalid code length";
    }
}

Hotp.prototype.uintToString = function(uintArray) {

    const encodedString = String.fromCharCode.apply(null, uintArray);
    const decodedString = decodeURIComponent(encodeURIComponent(encodedString));

    return decodedString;
};

Hotp.prototype.getOtp = function(key, counter) {
    let digest, h, offset, shaObj, v;

    shaObj = new jsSHA("SHA-1", "TEXT");
    shaObj.setHMACKey(key, "TEXT");
    shaObj.update(this.uintToString(new Uint8Array(this.intToBytes(counter))));
    digest = shaObj.getHMAC("HEX");

    h = this.hexToBytes(digest);

    offset = h[19] & 0xf;
    v = (h[offset] & 0x7f) << 24 | (h[offset + 1] & 0xff) << 16 | (h[offset + 2] & 0xff) << 8 | h[offset + 3] & 0xff;
    v = v + '';

    return v.substr(v.length - this.length, this.length);
};

Hotp.prototype.intToBytes = function(num) {
    let bytes = [],
        i = 7;

    while (i >= 0) {
        bytes[i] = num & 255;
        num = num >> 8;
        --i;
    }
    return bytes;
};

Hotp.prototype.hexToBytes = function(hex) {
    let C = hex.length,
        bytes  = [],
        c = 0;

    while (c < C) {
        bytes.push(parseInt(hex.substr(c, 2), 16));
        c += 2;
    }

    return bytes;
};