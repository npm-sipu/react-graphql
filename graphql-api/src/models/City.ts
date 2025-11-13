import mongoose, { Schema, Document } from "mongoose";

export interface ICity extends Document {
  name: string;
  state: mongoose.Types.ObjectId;
}

const CitySchema: Schema = new Schema({
  name: { type: String, required: true },
  state: { type: Schema.Types.ObjectId, ref: "State", required: true },
});

export const City = mongoose.model<ICity>("City", CitySchema);
