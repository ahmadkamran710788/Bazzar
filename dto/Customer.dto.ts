import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class CreateCustomerInput {
  @IsEmail()
  email: string;

  @Length(7, 12)
  phone: string;

  @Length(6, 12)
  password: string;
}

export class CustomerLoginInput {
  @IsEmail()
  email: string;

  @Length(6, 12)
  password: string;
}

export interface CustomerPayLoad {
  _id: string;
  email: string;
  verified: boolean;
}
