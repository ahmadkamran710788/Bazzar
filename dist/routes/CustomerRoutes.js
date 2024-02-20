"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRoute = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const route = express_1.default.Router();
exports.CustomerRoute = route;
//////////Signup/Create-Customer
route.post("/Signup", controllers_1.CustomerSignup);
///////////////Login//////////////\
route.post("/Login", controllers_1.CustomerLogin);
//Authentication////////////
route.use(middlewares_1.Authentication);
//////////////Verify CustomerAccount/////////
route.patch("/verfy-cutomer", controllers_1.CustomerVerify);
//////////////Otp request//////////////
route.get("/otp", controllers_1.RequestOpt);
///////////////Profile/////////////////
route.get("/profile", controllers_1.GetCustomerProfile);
route.patch("/profile", controllers_1.EditCustomerProfile);
//# sourceMappingURL=CustomerRoutes.js.map