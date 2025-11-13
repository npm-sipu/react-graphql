import mongoose, { Schema, Document } from "mongoose";

export interface ICountry extends Document {
  name: string;
  code?: string;
}

const CountrySchema: Schema = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: false },
});

export const Country = mongoose.model<ICountry>("Country", CountrySchema);
