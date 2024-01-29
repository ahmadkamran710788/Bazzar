// index.ts
import express from "express";
import { AdminRoutes, VenderRoutes } from "./routes";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { mongodb_url } from "./config";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/admin", AdminRoutes);
app.use("/vender", VenderRoutes);

mongoose.connect(mongodb_url).then(() => {
  console.log("we are connected with mongo db");
  app.listen(3000, "0.0.0.0", () => {
    console.log("app is listening ");
  });
});
