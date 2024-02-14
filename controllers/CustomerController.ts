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
  const customerInputs = plainToClass(CreateCustomerInput, req.body);
  const inputError = await validate(customerInputs, {
    validationError: { target: true },
  });

  if (inputError.length > 0) {
    return res.status(400).json(inputError);
  }

  const { email, password, phone } = customerInputs;

  const salt = await generate_Salt();
  const hash = await hashPassword(password, salt);

  const { otp, expiry } = GenerateOpt();
  //console.log(otp, expiry);

  //return res.json("working");

  const result = await Customer.create({
    email: email,
    password: hash,
    salt: salt,
    firstName: "",
    lastName: "",
    address: "",
    phone: phone,
    verified: false,
    otp: otp,
    otp_expiry: expiry,
    lat: 0,
    lng: 0,
  });

  if (result) {
    //send the otp to the customer
    await onRequestOTP(otp, phone);

    //generate the signature

    const signature = GenerateSignature({
      _id: result._id,
      email: result.email,
      verified: result.verified,
    });
    //send the resul to the customer

    return res.json({
      signature: signature,
      verified: result.verified,
      email: result.email,
    });
  } else {
    return res.status(400).json({ message: "the user is not created" });
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
