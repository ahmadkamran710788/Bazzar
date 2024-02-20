"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
exports.AdminRoutes = router;
router.post("/create-vender", controllers_1.CreateVender);
router.get("/find-venders", controllers_1.GetVenders);
router.get("/find-vender/:id", controllers_1.GetVendorbyId);
//# sourceMappingURL=AdminRoutes.js.map