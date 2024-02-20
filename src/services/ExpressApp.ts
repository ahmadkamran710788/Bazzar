// index.ts
import express, { Application } from "express";
import {
  AdminRoutes,
  CustomerRoute,
  ShoppingRoutes,
  VenderRoutes,
} from "../routes";

import path from "path";

export default async (app: Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/image", express.static(path.join(__dirname, "image")));

  app.use("/admin", AdminRoutes);
  app.use("/vender", VenderRoutes);
  app.use(ShoppingRoutes);
  app.use("/customer", CustomerRoute);

  return app;
};
