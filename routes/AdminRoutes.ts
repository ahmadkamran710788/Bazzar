import express, { Request, Response, NextFunction } from "express";
import { CreateVender, GetVenders, GetVendorbyId } from "../controllers";
const router = express.Router();

router.post("/create-vender", CreateVender);
router.post("/find-venders", GetVenders);
router.post("/find-venders-byId", GetVendorbyId);

export { router as AdminRoutes };
