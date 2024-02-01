import { NextFunction } from "express";
import { AuthPay } from "../dto/Auth.dot";
import { Validate_Signature } from "../utility";
import express, { Response, Request } from "express";

export const Authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validate = await Validate_Signature(req);
  if (validate) {
    next();
  } else {
    return res.json({ message: "user is not Authorized" });
  }
};
