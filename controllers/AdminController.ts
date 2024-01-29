import express, { Request, Response, NextFunction } from "express";
import { CreateVendorInput } from "../dto";
import { Vender } from "../models";
import bcrypt from "bcrypt";
import { generate_Salt, hashPassword } from "../utility";

export const CreateVender = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("creating vender");

    const {
      name,
      ownerName,
      address,
      pincode,
      foodType,
      email,
      password,
      phone,
    } = <CreateVendorInput>req.body;

    console.log("checking for verification of email");

    const verify_email = await Vender.findOne({ email: email });

    if (verify_email) {
      return res.status(404).json({ message: "The email already exists" });
    }
    const salt = await generate_Salt();
    console.log("Generated Salt:", salt);

    // Call hashPassword with the plaintext password and the generated salt
    const hashed = await hashPassword(password, salt);
    console.log("Hashed Password:", hashed);

    const vendor = await Vender.create({
      name: name,
      ownerName: ownerName,
      address: address,
      pincode: pincode,
      foodType: foodType,
      email: email,
      password: hashed,
      phone: phone,
      salt: salt,
      serviceAvailable: false,
      coverImages: [],
      rating: 0,
    });

    res.json(vendor);
  } catch (error) {
    console.log(error);
    next();
  }
};

export const GetVenders = (req: Request, res: Response, next: NextFunction) => {
  console.log("get venders");
  res.status(404).json({ message: "vendors found " });
};

//get vendors
export const GetVendorbyId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("get vender");
  res.json({ message: "vendor found " });
};
