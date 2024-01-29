// index.ts
import express from "express";
import { AdminRoutes, VenderRoutes } from "./routes";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/admin", AdminRoutes);
app.use("/vender", VenderRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
