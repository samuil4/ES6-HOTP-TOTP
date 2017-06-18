# ES6-HOTP-TOTP
ES6 implementation of HOTP and TOTP

---

Handles generation of [HMAC-based One-time Password Algorithm (HOTP) codes](https://en.wikipedia.org/wiki/HMAC-based_One-time_Password_Algorithm) as per the [HOTP RFC Draft](https://tools.ietf.org/html/rfc4226) and the [Time-based One-time Password Algorithm (TOTP) codes](http://en.wikipedia.org/wiki/Time-based_One-time_Password_Algorithm) as per the [TOTP RFC Draft](http://tools.ietf.org/id/draft-mraihi-totp-timebased-06.html). This library produces the same codes as the Google Authenticator app.

This package exports `OTP` and is based on this implementation [jiangts JS-OTP](https://github.com/jiangts/JS-OTP). 

Dependencies [jsSHA](https://github.com/Caligatio/jsSHA). You can get jsSHA from NPM.

## Usage:
Import `src/OTP.js` to your script like.

    import {OTP} from './src/OTP.js'
    
        
    /***
     * Configure TOTP settings for all or any timecode (optional)
     * @param {Number} expiry - <in seconds> defaults to 30
     * @param {Number} length - (between 6 and 8 ) defaults to 6
     */
    OTP.configTotp(expiry, length);
     
    /**
     * hotp usage
     * @param {String} otpKey - <your OTP key>
     * @param {Number} counter - <counter>
     */
    const hmacCode = OTP.getHotp(otpKey, counter);
    
    /**
     * totp usage
     * @param {String} otpKey - <your OTP key>
     * @param {Number} time - <milliseconds time> OPTIONAL. Defaults to new Date().getTime()
     */
    const timeCode = OTP.getTotp(otpKey, time);

## Fixes / Improvements:
* [Fixed] deprecated function calls like `escape`    
* [Improvement] added global configuration for TOTP
* [Fixed] exposing methods to global scope
    
## TO DO
* Switch from constructor function to plain object calls
* Better handling of errors

## TO DO if requested
* Add example build script for ES6
* Add cordova example usage
* Add angular 1.6+ example
* Add angular 2 example
* Add ng-cordova example
* Add test
* Add dist