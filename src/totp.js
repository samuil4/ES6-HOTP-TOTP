import JSSHA from 'jssha';

class Totp {

    constructor(expiry = 30, length = 6) {
        this.expiry = expiry;
        this.length = length;

        if (this.length > 8 || this.length < 6) {
            throw "Error: invalid code length";
        }
    }

    getOtp (secret, now = new Date().getTime()) {

        let epoch, hmac, key, offset, otp, shaObj, time;


        key = this.base32tohex(secret);
        epoch = Math.round(now / 1000.0);
        time = this.leftpad(this.dec2hex(Math.floor(epoch / this.expiry)), 16, "0");

        shaObj = new JSSHA("SHA-1", "HEX");
        shaObj.setHMACKey(key, "HEX");
        shaObj.update(time);
        hmac = shaObj.getHMAC("HEX");

        if (hmac === "KEY MUST BE IN BYTE INCREMENTS") {
            throw "Error: hex key must be in byte increments";
        } else {
            offset = this.hex2dec(hmac.substring(hmac.length - 1));
        }
        otp = (this.hex2dec(hmac.substr(offset * 2, 8)) & this.hex2dec("7fffffff")) + "";
        otp = otp.substr(otp.length - this.length, this.length);
        return otp;
    }

    dec2hex (s) {
        return (s < 15.5 ? "0" : "") + Math.round(s).toString(16);
    }

    hex2dec (s) {
        return parseInt(s, 16);
    }

    base32tohex (base32) {

        let base32chars, bits, chunk, hex, val;

        base32chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
        bits = "";
        hex = "";

        {
            let i = 0;
            while (i < base32.length) {
                val = base32chars.indexOf(base32.charAt(i).toUpperCase());
                bits += this.leftpad(val.toString(2), 5, "0");
                i++;
            }
        }

        {
            let i = 0;
            while (i + 4 <= bits.length) {
                chunk = bits.substr(i, 4);
                hex = hex + parseInt(chunk, 2).toString(16);
                i += 4;
            }
        }

        return hex;
    }

    leftpad (str, len, pad) {
        if (len + 1 >= str.length) {
            str = new Array(len + 1 - str.length).join(pad) + str;
        }
        return str;
    }
}

export default Totp;