import mongoose, { Schema, Document } from "mongoose";

export interface IState extends Document {
  name: string;
  country: mongoose.Types.ObjectId;
}

const StateSchema: Schema = new Schema({
  name: { type: String, required: true },
  country: { type: Schema.Types.ObjectId, ref: "Country", required: true },
});

export const State = mongoose.model<IState>("State", StateSchema);
