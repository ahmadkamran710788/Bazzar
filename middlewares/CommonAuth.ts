import { NextFunction } from "express";
import { AuthPay } from "../dto/Auth.dot";
import { Validate_Signature } from "../utility";
import express, { Response, Request } from "express";

export const Authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validate = await Validate_Signature(req);

    if (validate) {
      // If validation succeeds, move to the next middleware or route handler
      next();
    } else {
      // If validation fails, send a response indicating unauthorized access
      res.status(401).json({ message: "User is not authorized" });
    }
  } catch (error) {
    // Handle any unexpected errors during validation
    console.error("Authentication error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
