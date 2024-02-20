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
exports.RestaurantById = exports.SearchFoods = exports.GetFoodsIn30Mins = exports.GetTopRestaurants = exports.GetFoodAvailablity = void 0;
const models_1 = require("../models");
const GetFoodAvailablity = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const pincode = req.params.pincode;
    const result = yield models_1.Vender.find({ pincode: pincode, serviceAvailable: true })
        .sort([["rating", "descending"]])
        .populate("food");
    if (result.length > 0) {
        return res.status(200).json(result);
    }
    return res.status(400).json({ message: "data not found" });
});
exports.GetFoodAvailablity = GetFoodAvailablity;
const GetTopRestaurants = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const pincode = req.params.pincode;
    const result = yield models_1.Vender.find({
        pincode: pincode,
        serviceAvailable: true,
    })
        .sort([["rating", "descending"]])
        .limit(1);
    if (result.length > 0) {
        return res.status(200).json(result);
    }
    return res.status(400).json({ message: "data not found" });
});
exports.GetTopRestaurants = GetTopRestaurants;
const GetFoodsIn30Mins = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const pincode = req.params.pincode;
    const result = yield models_1.Vender.find({
        pincode: pincode,
        serviceAvailable: true,
    }).populate("food");
    if (result.length > 0) {
        let foodlist = [];
        result.map((vender) => {
            const food = vender.food;
            foodlist.push(...food.filter((food) => food.readytime < 30));
        });
        return res.status(200).json(foodlist);
    }
    return res.status(400).json({ message: "data not found" });
});
exports.GetFoodsIn30Mins = GetFoodsIn30Mins;
const SearchFoods = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const pincode = req.params.pincode;
    const result = yield models_1.Vender.find({
        pincode: pincode,
        serviceAvailable: true,
    }).populate("food");
    if (result.length > 0) {
        let foodlist = [];
        result.map((vender) => {
            const food = vender.food;
            foodlist.push(...food);
        });
        //result.map(item=>foodlist.push(...item.food))
        return res.status(200).json(foodlist);
    }
    return res.status(400).json({ message: "data not found" });
});
exports.SearchFoods = SearchFoods;
const RestaurantById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield models_1.Vender.findById(id).populate("food");
    if (result) {
        res.json(result);
    }
    res.status(400).json({ message: "something went wrong" });
});
exports.RestaurantById = RestaurantById;
//# sourceMappingURL=ShoppingControllers.js.map