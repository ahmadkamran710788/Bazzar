import express, { Request, Response, NextFunction } from "express";
import { CreateVender, GetVenders, GetVendorbyId } from "../controllers";
const router = express.Router();

router.post("/create-vender", CreateVender);
router.get("/find-venders", GetVenders);
router.get("/find-vender/:id", GetVendorbyId);

export { router as AdminRoutes };
