//email

import { accountSid, authToken } from "../config";

//notification
//OTP

export const GenerateOpt = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  let expiry = new Date();
  expiry.setTime(new Date().getTime() + 30 * 60 * 1000);
  return { otp, expiry };
};
export const onRequestOTP = async (otp: number, tothephone: string) => {
  const client = require("twilio")(accountSid, authToken);

  const message = client.messages.create({
    body: `OPT:${otp}`,
    to: "+15169732995", // Text your number
    from: `+92${tothephone}`, // From a valid Twilio number
  });
  return message;
};

//payment notification and email notification
