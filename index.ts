import express from "express";
import App from "./services/ExpressApp";
import DBconnections from "./services/Database";

const startServer = async () => {
  const Port = 1111;
  const app = express();
  await DBconnections();
  await App(app);
  app.listen(Port, () => {
    console.log("server is live ");
  });
};

startServer();
