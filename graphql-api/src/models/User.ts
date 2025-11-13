import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  dob?: string;
  country: mongoose.Types.ObjectId;
  state: mongoose.Types.ObjectId;
  city: mongoose.Types.ObjectId;
  role?: string;
  createdAt: string;
}

const UserSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dob: { type: String },
  country: { type: Schema.Types.ObjectId, ref: "Country", required: true },
  state: { type: Schema.Types.ObjectId, ref: "State", required: true },
  city: { type: Schema.Types.ObjectId, ref: "City", required: true },
  role: { type: String },
  createdAt: { type: String, default: () => new Date().toISOString() },
});

export const User = mongoose.model<IUser>("User", UserSchema);
