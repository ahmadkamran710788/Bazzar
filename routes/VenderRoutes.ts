import express, { Request, Response, NextFunction } from "express";
import {
  UpdateVenderProfile,
  UpdateVenderServices,
  VenderLogin,
  getVenderProfile,
} from "../controllers";
import { Authentication } from "../middlewares";

const router = express.Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello Vender");
});

router.post("/login", VenderLogin);

router.get("/profile", Authentication, getVenderProfile);
router.patch("/profile", UpdateVenderProfile);
router.patch("/services", UpdateVenderServices);

export { router as VenderRoutes };
