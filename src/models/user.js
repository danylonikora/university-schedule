import mongoose from "mongoose";
import COMMANDS from "../constants/commands.js";

const activityType = {};
Object.keys(COMMANDS).forEach((commandKey) => {
  activityType[commandKey] = { type: Number, required: true, default: 0 };
});

const userSchema = new mongoose.Schema({
  _id: Number,
  name: { type: String, required: true },
  subgroup: { type: Number, required: true },
  is_admin: { type: Boolean, required: true },
  is_notifications_on: { type: Boolean, required: true },
  registration_date: { type: Date, required: true },
  activity: {
    type: [
      {
        activity: { type: String, required: true },
        date: { type: Date, required: true },
      },
    ],
    required: true,
    default: [],
  },
});

const User = mongoose.model("User", userSchema);

export default User;
