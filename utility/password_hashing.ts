import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request } from "express";
import { VenderPayLoad } from "../dto";
import { secretKey } from "../config";
import { AuthPay } from "../dto/Auth.dot";
export const generate_Salt = async() => await bcrypt.genSalt();

export const hashPassword = (password: string, salt: string) =>
  bcrypt.hash(password, salt);

export const valid_password = (userPassword: string, hash: string) => {
  return bcrypt.compare(userPassword, hash);
};
export const GenerateSignature = (payload: VenderPayLoad) => {
  const signature = jwt.sign(payload, secretKey, { expiresIn: "1d" });
  return signature;
};
export const Validate_Signature = async (req: Request) => {
  const signature = req.get("Authorization");
  if (signature) {
    const payload = (await jwt.verify(
      signature.split(" ")[1],
      secretKey
    )) as AuthPay;
    req.user = payload;
    return true;
  }
  return false;
};
