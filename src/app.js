import * as dotEnv from "dotenv";
import TelegramBot from "node-telegram-bot-api";
import commands from "./commands.js";
import notificationsController from "./controllers/notifications.js";
import connect from "./db/connect.js";

async function main() {
  dotEnv.config();

  await connect();

  const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });
  notificationsController(bot);
  commands(bot);
}

main();
