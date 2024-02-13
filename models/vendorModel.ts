import mongoose, { Schema, Document, model } from "mongoose";
export interface VenderDoc extends Document {
  name: string;
  ownerName: string;
  foodType: [string];
  pincode: string;
  address: string;
  phone: string;
  email: string;
  password: string;
  salt: string;
  serviceAvailable: boolean;
  coverImage: [string];
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
      type: [String],
      required: true,
    },

    pincode: {
      type: String,
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
    food: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "food",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Vender = mongoose.model<VenderDoc>("vender", venderSchema);
export { Vender };
