import express, { Request, Response, NextFunction } from "express";
import {
  GetFoodAvailablity,
  GetFoodsIn30Mins,
  GetTopRestaurants,
  RestaurantById,
  SearchFoods,
} from "../controllers/ShoppingControllers";
const routes = express.Router();

///////////////////food Availability /////////////////////
routes.get("/:pincode", GetFoodAvailablity);
//////////////////Top Restaurant ////////////////////////
routes.get("/top-restaurants/:pincode", GetTopRestaurants);
/////////////////food Available in 30 mins///////////////
routes.get("/foods-in-30min/:pincode", GetFoodsIn30Mins);
/////////////////search Food////////////////////////////
routes.get("/search/:pincode", SearchFoods);
///////////////find returent by id /////////////////////
routes.get("/restaurants/:id", RestaurantById);

export { routes as ShoppingRoutes };
