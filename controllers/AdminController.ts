import express, { Request, Response, NextFunction } from "express";
import { CreateVendorInput } from "../dto";
//create vendors
export const CreateVender = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("create vender");
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

  res.json({ message: "i am vender hahaha" });
};

//get multiple venders
export const GetVenders = (req: Request, res: Response, next: NextFunction) => {
  console.log("create vender");
  res.json({ message: "vendors found " });
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
