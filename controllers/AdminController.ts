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

export const GetVenders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const vender = await Vender.find();
    if (vender.length > 0) {
      res.json(vender);
      console.log("got all venders");
    } else {
      res.json({ message: "there are no vendors till now " });
    }
  } catch (error) {
    console.error("Error fetching vendors:", error);
    res.status(500).json({ message: "Internal server error" });
    next(error);
  }
};

//get vendors
export const GetVendorbyId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;

  try {
    const vendor = await Vender.findById(id);

    if (!vendor) {
      return res.json({ message: "Vendor doesn't exist" });
    }

    res.json({ vendor, message: "Vendor found" });
  } catch (error) {
    // Handle any potential errors
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
