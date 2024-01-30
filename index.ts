// index.ts
import express from "express";
import { AdminRoutes, VenderRoutes } from "./routes";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { mongodb_url } from "./config";

const Port = 4000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/admin", AdminRoutes);
app.use("/vender", VenderRoutes);

mongoose.connect(mongodb_url).then(() => {
  console.log("Connected to MongoDB");
  app.listen(Port, () => {
    console.log(`App is listening on port ${Port}`);
  });
});
