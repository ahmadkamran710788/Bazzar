import express, { Request, Response, NextFunction } from "express";
import { LoginVendorInput } from "../dto";
import { Vender } from "../models";
import { FindVender } from "./AdminController";
import { valid_password } from "../utility";

export const VenderLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = <LoginVendorInput>req.body;
  const user = await FindVender("", email);

  if (user != null) {
    const verifyPassword = await valid_password(password, user.password);
    console.log(verifyPassword);
    if (!verifyPassword) {
      return res.json({ message: "Password doesn't match " });
    } else {
      return res.json(user);
    }
  }
  res.json({ message: "user doesn't exist" });
};
