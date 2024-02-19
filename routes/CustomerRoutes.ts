import express from "express";
import {
  CustomerLogin,
  CustomerSignup,
  CustomerVerify,
  EditCustomerProfile,
  GetCustomerProfile,
  RequestOpt,
} from "../controllers";
import { Authentication } from "../middlewares";
const route = express.Router();

//////////Signup/Create-Customer

route.post("/Signup", CustomerSignup);

///////////////Login//////////////\
route.post("/Login", CustomerLogin);

//Authentication////////////
route.use(Authentication);

//////////////Verify CustomerAccount/////////
route.patch("/verfy-cutomer", CustomerVerify);

//////////////Otp request//////////////
route.get("/otp", RequestOpt);

///////////////Profile/////////////////
route.get("/profile", GetCustomerProfile);
route.patch("/profile", EditCustomerProfile);

///Cart Section
//Payment Section

export { route as CustomerRoute };
