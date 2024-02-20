"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VenderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const controllers_1 = require("../controllers");
const VenderControler_1 = require("../controllers/VenderControler");
const middlewares_1 = require("../middlewares");
const router = express_1.default.Router();
exports.VenderRoutes = router;
const imageStorage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "image");
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + "_" + file.originalname);
    },
});
const images = (0, multer_1.default)({ storage: imageStorage }).array("images", 10);
router.get("/", (req, res, next) => {
    res.send("Hello Vender");
});
router.post("/login", controllers_1.VenderLogin);
router.use(middlewares_1.Authentication);
router.get("/profile", controllers_1.getVenderProfile);
router.patch("/updateprofile", controllers_1.UpdateVenderProfile);
router.patch("/updateprofilepicture", images, VenderControler_1.EditProfilePicture);
router.patch("/service", controllers_1.UpdateVenderServices);
router.post("/food", images, VenderControler_1.AddFood);
router.get("/foods", VenderControler_1.GetFood);
//# sourceMappingURL=VenderRoutes.js.map