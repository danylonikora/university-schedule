import mongoose from "mongoose";
import CLASSES from "../constants/classes.js";

const classSchema = new mongoose.Schema({
  index: { type: Number, required: true, min: 0, max: 6 },
  subgroup: { type: Number, default: 0 },
  name: { type: String, required: true, enum: CLASSES.names },
  type: { type: String, required: true, enum: CLASSES.types },
  location: { type: String, required: true, enum: CLASSES.locations.online },
  date: { type: Date, required: true },
  start: { type: Date, requred: true },
  end: { type: Date, required: true },
  link_to_video_call: { type: String, default: "" },
});

classSchema.index({ date: 1 });

const Class = mongoose.model("Class", classSchema);

export default Class;
