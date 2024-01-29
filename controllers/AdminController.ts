import express, { Request, Response, NextFunction } from "express";
import { CreateVendorInput } from "../dto";
import { Vender } from "../models";
//create vendors
export const CreateVender = async (
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

  const vendor = await Vender.create({
    name: name,
    ownerName: ownerName,
    address: address,
    pincode: pincode,
    foodType: foodType,
    email: email,
    password: password,
    phone: phone,
    salt: "",
    serviceAvailable: false,
    coverImages: [],
    rating: 0,
  });

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
