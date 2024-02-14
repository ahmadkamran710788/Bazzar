//email

//notification
//OTP

export const GenerateOpt = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  let expiry = new Date();
  expiry.setTime(new Date().getTime() + 30 * 60 * 1000);
  return { otp, expiry };
};

export const onRequestOTP = async (otp: number, tothephone: string) => {
  const acountSid = "ACea220f3d9543ad9b5fe067581bc3ca02";
  const authToken = "f8a36a315878a2d3f8d306e8c818dd46";
  const client = require("twilio")(acountSid, authToken);
  const message = await client.message.create({
    body: `your OTP is ${otp}`,
    from: "+15169732995",
    to: tothephone,
  });
  return message;
};

//payment notification and email notification
