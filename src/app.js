import * as dotEnv from "dotenv";
import TelegramBot from "node-telegram-bot-api";
import mongoose from "mongoose";
import commands from "./commands.js";
import notificationsController from "./controllers/notifications.js";

dotEnv.config();

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log("DB connected");

  const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

  notificationsController(bot);
  commands(bot);
}

main();
