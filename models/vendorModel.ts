import mongoose, { Schema, Document, Model } from "mongoose";
interface VenderDoc extends Document {
  name: String;
  ownerName: String;
  foodType: [String];
  pincode: String;
  address: String;
  phone: String;
  email: String;
  password: String;
  salt: String;
  serviceAvailable: Boolean;
  coverImage: [String];
  rating: number;
  food: any;
}

const venderSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    ownerName: {
      type: String,
      required: true,
    },
    foodType: {
      type: String,
      required: true,
    },

    pincode: {
      type: [String],
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
      required: true,
    },
    serviceAvailable: {
      type: Boolean,
    },
    coverImage: {
      type: [String],
    },
    rating: {
      type: Number,
    },
    food: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "food",
    },
  },
  {
    timestamps: true,
  }
);
