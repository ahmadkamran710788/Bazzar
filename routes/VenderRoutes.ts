import express, { Request, Response, NextFunction } from "express";
import { VenderLogin } from "../controllers";

const router = express.Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello Vender");
});

router.post("/login", VenderLogin);

export { router as VenderRoutes };
