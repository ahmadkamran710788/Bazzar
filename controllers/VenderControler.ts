import express, { Request, Response, NextFunction } from "express";
import { LoginVendorInput, UpdateVenderInput } from "../dto";
import { Vender } from "../models";
import { FindVender } from "./AdminController";
import {
  GenerateSignature,
  generate_Salt,
  hashPassword,
  valid_password,
} from "../utility";

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
    console.log(user);

    const existing_User = await FindVender(user._id);
    return res.json(existing_User);
  }
  return res.json({ message: "the Vender doesn't exist " });
};

export const UpdateVenderProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, address, foodType, password, phone } = <UpdateVenderInput>(
      req.body
    );
    const user = req.user;

    if (user) {
      console.log(user);
      const existing_User = await FindVender(user._id);

      if (existing_User) {
        // Update user profile
        existing_User.name = name;
        existing_User.address = address;
        existing_User.foodType = [foodType[0]];
        existing_User.phone = phone;

        if (password) {
          const salt = await generate_Salt();
          const hashedPassword = await hashPassword(password, salt);
          existing_User.password = hashedPassword;
          existing_User.salt = salt;
        }

        // Save the updated user profile
        const updatedUser = await existing_User.save();

        res
          .status(200)
          .json({ message: "User profile updated successfully", updatedUser });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } else {
      res.status(401).json({ message: "Authentication failed" });
    }
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const UpdateVenderServices = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    if (user) {
      const existing_Vender = await FindVender(user._id);
      if (existing_Vender) {
        existing_Vender.serviceAvailable = !existing_Vender.serviceAvailable;
        const saveResult = await existing_Vender.save();
        return res.json(saveResult);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    }
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
