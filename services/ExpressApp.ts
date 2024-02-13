// index.ts
import express, { Application } from "express";
import { AdminRoutes, VenderRoutes } from "../routes";
import bodyParser from "body-parser";
import path from "path";

const Port = 1111;
export default async (app: Application) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/image", express.static(path.join(__dirname, "image")));

  app.use("/admin", AdminRoutes);
  app.use("/vender", VenderRoutes);
  return app;
};
