"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShoppingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const routes = express_1.default.Router();
exports.ShoppingRoutes = routes;
///////////////////food Availability /////////////////////
routes.get("/:pincode", controllers_1.GetFoodAvailablity);
//////////////////Top Restaurant ////////////////////////
routes.get("/top-restaurants/:pincode", controllers_1.GetTopRestaurants);
/////////////////food Available in 30 mins///////////////
routes.get("/foods-in-30min/:pincode", controllers_1.GetFoodsIn30Mins);
/////////////////search Food////////////////////////////
routes.get("/search/:pincode", controllers_1.SearchFoods);
///////////////find returent by id /////////////////////
routes.get("/restaurants/:id", controllers_1.RestaurantById);
//# sourceMappingURL=ShoppingRoutes.js.map