import express from "express";
import App from "./services/ExpressApp";
import DBconnections from "./services/Database";
import { PORT } from "./config";

const startServer = async () => {
  const app = express();
  await DBconnections();
  await App(app);
  app.listen(PORT, () => {
    console.log(`we are live on port ${PORT}`);
  });
};

startServer();
