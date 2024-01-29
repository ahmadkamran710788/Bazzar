import express, { Request, Response, NextFunction } from "express";
import { CreateVendorInput } from "../dto";
import { Vender } from "../models";
import bcrypt from "bcrypt";

// Create vendors
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
    } = req.body;

    console.log("checking for verification of email");

    const verify_email = await Vender.findOne({ email: email });

    if (verify_email) {
      return res.status(404).json({ message: "The email already exists" });
    }

    // Corrected: Use await or .then() to handle the result of bcrypt.hash
    const hashPassword = bcrypt.hash(password, 11);

    const vendor = await Vender.create({
      name: name,
      ownerName: ownerName,
      address: address,
      pincode: pincode,
      foodType: foodType,
      email: email,
      password: hashPassword, // Use the hashed password here
      phone: phone,
      salt: "someSaltvalue",
      serviceAvailable: false,
      coverImages: [],
      rating: 0,
    });

    res.json(vendor);
  } catch (error) {
    // Forward the error to the global error handler
    console.log(error);
    next();
  }
};

// Other route handlers...

//get multiple venders
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
