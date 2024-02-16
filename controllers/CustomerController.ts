import express, { Request, Response, NextFunction } from "express";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { CreateCustomerInput } from "../dto/Customer.dto";
import {
  GenerateOpt,
  GenerateSignature,
  generate_Salt,
  hashPassword,
  onRequestOTP,
} from "../utility";
import { Customer } from "../models";

export const CustomerSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerInputs = plainToClass(CreateCustomerInput, req.body);
    const inputErrors = await validate(customerInputs, {
      validationError: { target: true },
    });

    if (inputErrors.length > 0) {
      return res.status(400).json(inputErrors);
    }

    const { email, password, phone } = customerInputs;
    const existingCustomer = await Customer.findOne({ email });

    if (existingCustomer) {
      return res.status(401).json({ message: "Customer already exists." });
    }

    const salt = await generate_Salt();
    const hash = await hashPassword(password, salt);
    const { otp, expiry } = GenerateOpt();

    const result = await Customer.create({
      email,
      password: hash,
      salt,
      firstName: "",
      lastName: "",
      address: "",
      phone,
      verified: false,
      otp,
      otp_expiry: expiry,
      lat: 0,
      lng: 0,
    });

    const signature = GenerateSignature({
      _id: result._id,
      email: result.email,
      verified: result.verified,
    });

    // Send the OTP to the customer (if needed)
    // await onRequestOTP(otp, phone);

    return res.json({
      signature,
      verified: result.verified,
      email: result.email,
    });
  } catch (error) {
    console.error("Error during customer signup:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const CustomerLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const CustomerVerify = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const RequestOpt = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const GetCustomerProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const EditCustomerProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
