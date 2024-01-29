import bcrypt from "bcrypt";
export const generate_Salt = () => bcrypt.genSalt();

export const hashPassword = (password: string, salt: string) =>
  bcrypt.hash(password, salt);
