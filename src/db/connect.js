import mongoose from "mongoose";
import log from "../logger/index.js";

export default async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    log.info("Database connected");
  } catch (err) {
    log.error("Error during DB connection: ", err);
    process.exit(1);
  }
}
