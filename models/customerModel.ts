import mongoose, { Schema, Document, model } from "mongoose";
export interface CustomerDoc extends Document {
  email: string;
  password: string;
  salt: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  verified: boolean;
  otp: number;
  otp_expiry: Date;
  lat: number;
  lng: number;
}

const customerSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, requied: true },
    salt: { type: String, requied: true },
    firstName: { type: String, requied: true },
    lastName: { type: String, requied: true },
    address: { type: String, requied: true },
    phone: { type: String, requied: true },
    verified: { type: Boolean, requied: true },
    otp: { type: Number, requied: true },
    otp_expiry: { type: Number, requied: true },
    lat: { type: Number },
    lng: { type: Number },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password,
          delete ret.salt,
          delete ret.__v,
          delete ret.createdAt,
          delete ret.updatedAt;
      },
    },
    timestamps: true,
  }
);

const Customer = mongoose.model<CustomerDoc>("customer", customerSchema);
export { Customer };
