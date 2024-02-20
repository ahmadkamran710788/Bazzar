import mongoose, { Schema, Document, Model } from "mongoose";

export interface FoodDoc extends Document {
  venderId: string;
  name: string;
  description: string;
  category: string;
  foodType: string;
  readytime: number;
  price: number;
  rating: number;
  image: [string];
}

export const foodSchema = new Schema(
  {
    venderId: { type: String },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    foodType: { type: String, required: true },
    readytime: { type: Number, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
    image: { type: [String], required: true },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v, delete ret.createdAt, delete ret.updatedAt;
      },
    },
    timestamps: true,
  }
);
const Food = mongoose.model<FoodDoc>("food", foodSchema);
export { Food };
