import { NextFunction } from "express";
import { AuthPay } from "../dto/Auth.dot";
import { Validate_Signature } from "../utility";
import express, { Response, Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: AuthPay;
    }
  }
}

export const Authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validate = await Validate_Signature(req);

    if (validate) {
      next();
    } else {
      res.status(401).json({ message: "User is not authorized" });
    }
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
