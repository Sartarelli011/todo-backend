import { Schema, model } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export const User = model<IUser>("User", UserSchema);
