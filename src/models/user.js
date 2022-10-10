import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id: Number,
  name: { type: String, required: true },
  subgroup: { type: Number, required: true },
  is_admin: { type: Boolean, required: true },
});

const User = mongoose.model("User", userSchema);

export default User;
