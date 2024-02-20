"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetVendorbyId = exports.GetVenders = exports.CreateVender = exports.FindVender = void 0;
const models_1 = require("../models");
const utility_1 = require("../utility");
const FindVender = (id, email) => __awaiter(void 0, void 0, void 0, function* () {
    if (email) {
        return yield models_1.Vender.findOne({ email });
    }
    else {
        return yield models_1.Vender.findById(id);
    }
});
exports.FindVender = FindVender;
const CreateVender = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("creating vender");
        const { name, ownerName, address, pincode, foodType, email, password, phone, } = req.body;
        console.log("checking for verification of email");
        const verify_email = yield (0, exports.FindVender)("", email);
        if (verify_email) {
            return res.status(404).json({ message: "The email already exists" });
        }
        const salt = yield (0, utility_1.generate_Salt)();
        console.log("Generated Salt:", salt);
        const hashed = yield (0, utility_1.hashPassword)(password, salt);
        console.log("Hashed Password:", hashed);
        const vendor = yield models_1.Vender.create({
            name: name,
            ownerName: ownerName,
            address: address,
            pincode: pincode,
            foodType: foodType,
            email: email,
            password: hashed,
            phone: phone,
            salt: salt,
            serviceAvailable: false,
            coverImages: [],
            rating: 0,
            food: [],
        });
        res.json(vendor);
        console.log(vendor);
    }
    catch (error) {
        console.log(error);
        next();
    }
});
exports.CreateVender = CreateVender;
const GetVenders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vender = yield models_1.Vender.find();
        if (vender.length > 0) {
            res.json(vender);
            console.log("got all venders");
        }
        else {
            res.json({ message: "there are no vendors till now " });
        }
    }
    catch (error) {
        console.error("Error fetching vendors:", error);
        res.status(500).json({ message: "Internal server error" });
        next(error);
    }
});
exports.GetVenders = GetVenders;
//get vendors
const GetVendorbyId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const vendor = yield (0, exports.FindVender)(id);
        if (!vendor) {
            return res.json({ message: "Vendor doesn't exist" });
        }
        res.json({ vendor, message: "Vendor found" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.GetVendorbyId = GetVendorbyId;
//# sourceMappingURL=AdminController.js.map