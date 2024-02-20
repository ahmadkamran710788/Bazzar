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
exports.GetFood = exports.EditProfilePicture = exports.AddFood = exports.UpdateVenderServices = exports.UpdateVenderProfile = exports.getVenderProfile = exports.VenderLogin = void 0;
const models_1 = require("../models");
const AdminController_1 = require("./AdminController");
const utility_1 = require("../utility");
const VenderLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield (0, AdminController_1.FindVender)("", email);
    if (user != null) {
        const signature = (0, utility_1.GenerateSignature)({
            _id: user._id,
            email: user.email,
            foodType: user.foodType,
            name: user.name,
        });
        const verifyPassword = yield (0, utility_1.valid_password)(password, user.password);
        console.log(verifyPassword);
        if (!verifyPassword) {
            return res.json({ message: "Password doesn't match " });
        }
        else {
            return res.json({ signature });
        }
    }
    res.json({ message: "user doesn't exist" });
});
exports.VenderLogin = VenderLogin;
const getVenderProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user) {
        console.log(user);
        const existing_User = yield (0, AdminController_1.FindVender)(user._id);
        return res.json(existing_User);
    }
    return res.json({ message: "the Vender doesn't exist " });
});
exports.getVenderProfile = getVenderProfile;
const UpdateVenderProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, address, foodType, password, phone } = (req.body);
        const user = req.user;
        if (user) {
            console.log(user);
            const existing_User = yield (0, AdminController_1.FindVender)(user._id);
            if (existing_User) {
                // Update user profile
                existing_User.name = name;
                existing_User.address = address;
                existing_User.foodType = [foodType[0]];
                existing_User.phone = phone;
                if (password) {
                    const salt = yield (0, utility_1.generate_Salt)();
                    const hashedPassword = yield (0, utility_1.hashPassword)(password, salt);
                    existing_User.password = hashedPassword;
                    existing_User.salt = salt;
                }
                // Save the updated user profile
                const updatedUser = yield existing_User.save();
                res
                    .status(200)
                    .json({ message: "User profile updated successfully", updatedUser });
            }
            else {
                res.status(404).json({ message: "User not found" });
            }
        }
        else {
            res.status(401).json({ message: "Authentication failed" });
        }
    }
    catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.UpdateVenderProfile = UpdateVenderProfile;
const UpdateVenderServices = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (user) {
            const existing_Vender = yield (0, AdminController_1.FindVender)(user._id);
            if (existing_Vender) {
                existing_Vender.serviceAvailable = !existing_Vender.serviceAvailable;
                const saveResult = yield existing_Vender.save();
                return res.json(saveResult);
            }
            else {
                res.status(404).json({ message: "User not found" });
            }
        }
    }
    catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.UpdateVenderServices = UpdateVenderServices;
const AddFood = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const { name, description, category, foodType, readytime, price } = req.body;
        const vender = yield (0, AdminController_1.FindVender)(user._id);
        if (!vender) {
            return res.status(404).json({ message: "Vendor not found" });
        }
        const files = req.files;
        if (!files || files.length === 0) {
            return res.status(400).json({ message: "No files uploaded" });
        }
        const images = files.map((file) => file.filename);
        const createFood = yield models_1.Food.create({
            venderId: vender._id,
            name,
            description,
            category,
            foodType,
            readytime,
            price,
            rating: 0,
            image: images,
        });
        vender.food.push(createFood);
        const result = yield vender.save();
        return res.json(result);
    }
    catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ message: "Something went wrong in adding the food" });
    }
});
exports.AddFood = AddFood;
const EditProfilePicture = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const vender = yield (0, AdminController_1.FindVender)(user._id);
        if (!vender) {
            return res.status(404).json({ message: "Vendor not found" });
        }
        const files = req.files;
        if (!files || files.length === 0) {
            return res.status(400).json({ message: "No files uploaded" });
        }
        const images = files.map((file) => file.filename);
        vender.coverImage.push(...images);
        const result = yield vender.save();
        return res.json(result);
    }
    catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ message: "Something went wrong in adding the food" });
    }
});
exports.EditProfilePicture = EditProfilePicture;
//we will get food over here
const GetFood = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (user) {
            const food = yield models_1.Food.find({ venderId: user._id });
            if (food != null) {
                res.json(food);
            }
            else {
                res.json({ message: "no food in the list " });
            }
        }
        else {
            return res.status(404).json({ message: "User not found" });
        }
    }
    catch (error) {
        res.json({ message: " something went wrong in getting the food" });
    }
});
exports.GetFood = GetFood;
//# sourceMappingURL=VenderControler.js.map