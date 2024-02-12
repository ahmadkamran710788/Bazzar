export interface CreateVendorInput {
  name: string;
  ownerName: string;
  foodType: string[];
  pincode: string;
  address: string;
  phone: string;
  email: string;
  password: string;
}

export interface LoginVendorInput {
  email: string;
  password: string;
}

export interface UpdateVenderInput {
  name: string;
  address: string;
  foodType: string[];
  password: string;
  phone: string;
}

export interface VenderPayLoad {
  _id: string;
  email: string;
  name: string;
  foodType: string[];
}
