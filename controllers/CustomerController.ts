import express, { Request, Response, NextFunction } from "express";
import { plainToClass } from "class-transformer";
import { IsEmail, ValidationError, validate } from "class-validator";
import { CreateCustomerInput, CustomerLoginInput } from "../dto/Customer.dto";
import {
  GenerateOpt,
  GenerateSignature,
  generate_Salt,
  hashPassword,
  onRequestOTP,
  valid_password,
} from "../utility";
import { Customer } from "../models";
import { verify } from "jsonwebtoken";

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
      otp: otp,
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
      opt: result.otp,
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
) => {
  const LoginInput = plainToClass(CustomerLoginInput, req.body);
  const LoginErrors = await validate(LoginInput, {
    validationError: { target: false },
  });
  if (LoginErrors.length > 0) {
    return res.status(400).json(LoginErrors);
  }

  const { email, password } = LoginInput;
  const customer = await Customer.findOne({ email });
  if (customer) {
    const validation = await valid_password(password, customer.password);
    if (validation) {
      const signature = await GenerateSignature({
        _id: customer.id,
        email: customer.email,
        verified: customer.verified,
      });
    }
  }
};

export const CustomerVerify = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { opt } = req.body;
  const customer = req.user;
  if (customer) {
    const profile = await Customer.findById(customer._id);
    if (profile) {
      if (profile.otp == parseInt(opt) && profile.otp_expiry >= new Date()) {
        profile.verified = true;
        const updarteCustomerResponse = await profile.save();

        const signature = await GenerateSignature({
          _id: updarteCustomerResponse.id,
          email: updarteCustomerResponse.email,
          verified: updarteCustomerResponse.verified,
        });
        return res.status(201).json({
          signature: signature,
          verify: updarteCustomerResponse.verified,
          email: updarteCustomerResponse.email,
        });
      }
    }
  }
  return res.status(400).json({ message: "Error with OTP Validation" });
};

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
