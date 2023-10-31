import mongoose from "mongoose";
import { UserType } from "../types";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true },
  password: { type: String },
});

export default mongoose.model<UserType & mongoose.Document>("User", userSchema);

// model mothods exists on instances of the model object
// statics are static functions
