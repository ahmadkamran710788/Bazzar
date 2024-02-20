import { compareSync } from "bcrypt";
import express, { Request, Response, NextFunction, response } from "express";
import { Food, FoodDoc, Vender } from "../models";

export const GetFoodAvailablity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pincode = req.params.pincode;

  const result = await Vender.find({ pincode: pincode, serviceAvailable: true })
    .sort([["rating", "descending"]])
    .populate("food");
  if (result.length > 0) {
    return res.status(200).json(result);
  }
  return res.status(400).json({ message: "data not found" });
};

export const GetTopRestaurants = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pincode = req.params.pincode;

  const result = await Vender.find({
    pincode: pincode,
    serviceAvailable: true,
  })
    .sort([["rating", "descending"]])
    .limit(1);

  if (result.length > 0) {
    return res.status(200).json(result);
  }
  return res.status(400).json({ message: "data not found" });
};

export const GetFoodsIn30Mins = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pincode = req.params.pincode;

  const result = await Vender.find({
    pincode: pincode,
    serviceAvailable: true,
  }).populate("food");

  if (result.length > 0) {
    let foodlist: any = [];
    result.map((vender) => {
      const food = vender.food as [FoodDoc];
      foodlist.push(...food.filter((food) => food.readytime < 30));
    });

    return res.status(200).json(foodlist);
  }
  return res.status(400).json({ message: "data not found" });
};

export const SearchFoods = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pincode = req.params.pincode;

  const result = await Vender.find({
    pincode: pincode,
    serviceAvailable: true,
  }).populate("food");

  if (result.length > 0) {
    let foodlist: any = [];
    result.map((vender) => {
      const food = vender.food as [FoodDoc];
      foodlist.push(...food);
    });
    //result.map(item=>foodlist.push(...item.food))
    return res.status(200).json(foodlist);
  }
  return res.status(400).json({ message: "data not found" });
};

export const RestaurantById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const result = await Vender.findById(id).populate("food");
  if (result) {
    res.json(result);
  }
  res.status(400).json({ message: "something went wrong" });
};
