import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class CreateCustomerInput {
  @IsEmail()
  email: string;

  phone: string;

  @Length(6, 12)
  password: string;
}

export interface CustomerPayLoad {
  _id: string;
  email: string;
  verified: boolean;
}
