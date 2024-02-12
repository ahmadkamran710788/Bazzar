import express, { Request, Response, NextFunction } from "express";
import multer from "multer";
import {
  UpdateVenderProfile,
  UpdateVenderServices,
  VenderLogin,
  getVenderProfile,
} from "../controllers";
import {
  AddFood,
  EditProfilePicture,
  GetFood,
} from "../controllers/VenderControler";
import { Authentication } from "../middlewares";

const router = express.Router();

const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "image");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + "_" + file.originalname);
  },
});
const images = multer({ storage: imageStorage }).array("images", 10);

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello Vender");
});

router.post("/login", VenderLogin);
router.use(Authentication);
router.get("/profile", getVenderProfile);
router.patch("/updateprofile", UpdateVenderProfile);
router.patch("/updateprofilepicture", images, EditProfilePicture);
router.patch("/service", UpdateVenderServices);
router.post("/food", images, AddFood);
router.get("/foods", GetFood);

export { router as VenderRoutes };
