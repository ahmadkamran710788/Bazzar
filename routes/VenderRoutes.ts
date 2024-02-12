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
router.use(Authentication);
router.get("/profile", getVenderProfile);
router.patch("/updateprofile", UpdateVenderProfile);
router.patch("/service", UpdateVenderServices);

export { router as VenderRoutes };
