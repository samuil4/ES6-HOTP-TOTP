import Totp from './totp';
import Hotp from './hotp';

let totpConfig = {
    expiry: 30,
    length: 6
};

export const OTP ={
    getTotp: getTotp,
    getHotp: getHotp,
    configTotp: configTotp
};

/***
 * Configure TOTP settings
 * @param {Number} expiry - in seconds
 * @param {Number} length - between 6 and 8
 */
function configTotp (expiry = 30, length = 6) {
    totpConfig.expiry = expiry;
    totpConfig.length = length;
}

/***
 * Get new Time code
 * @param {String} optKey
 * @param {Number} time
 * @returns {String}
 */
function getTotp (optKey, time) {

    const totp = new Totp(totpConfig.expiry, totpConfig.length);
    return totp.getOtp(optKey, time);
}

/***
 * Get new Hmac Code
 * @param {String} optKey
 * @param {Number} counter
 * @returns {String}
 */
function getHotp (optKey, counter) {

    const hotp = new Hotp();
    return hotp.getOtp(optKey, counter);
}