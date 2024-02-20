"use strict";
//email
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onRequestOTP = exports.GenerateOpt = void 0;
const config_1 = require("../config");
//notification
//OTP
const GenerateOpt = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    let expiry = new Date();
    expiry.setTime(new Date().getTime() + 30 * 60 * 1000);
    return { otp, expiry };
};
exports.GenerateOpt = GenerateOpt;
const onRequestOTP = (otp, tothephone) => __awaiter(void 0, void 0, void 0, function* () {
    const client = require("twilio")(config_1.accountSid, config_1.authToken);
    const message = client.messages.create({
        body: `OPT:${otp}`,
        to: "+15169732995", // Text your number
        from: `+92${tothephone}`, // From a valid Twilio number
    });
    return message;
});
exports.onRequestOTP = onRequestOTP;
//payment notification and email notification
//# sourceMappingURL=Notification_unitility.js.map