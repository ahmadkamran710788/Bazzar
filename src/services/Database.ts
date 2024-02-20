// index.ts

import mongoose from "mongoose";
import { mongodb_url } from "../config";

export default async () => {
  try {
    mongoose.connect(mongodb_url).then(() => {
      console.log("Connected to MongoDB");
    });
  } catch (error) {
    console.log(error);
  }
};
