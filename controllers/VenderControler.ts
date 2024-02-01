import express, { Request, Response, NextFunction } from "express";
import { LoginVendorInput } from "../dto";
import { Vender } from "../models";
import { FindVender } from "./AdminController";
import { GenerateSignature, valid_password } from "../utility";

export const VenderLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = <LoginVendorInput>req.body;
  const user = await FindVender("", email);

  if (user != null) {
    const signature = GenerateSignature({
      _id: user._id,
      email: user.email,
      foodType: user.foodType,
      name: user.name,
    });
    const verifyPassword = await valid_password(password, user.password);
    console.log(verifyPassword);
    if (!verifyPassword) {
      return res.json({ message: "Password doesn't match " });
    } else {
      return res.json({ signature });
    }
  }
  res.json({ message: "user doesn't exist" });
};

export const getVenderProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  if (user) {
    const existing_User = await FindVender(user._id);
    return res.json(existing_User);
  }
  return res.json({ message: "the Vender doesn't exist " });
};

export const UpdateVenderProfile = () => {};
export const UpdateVenderServices = () => {};
