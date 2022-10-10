import { makeAdmin as makeAdminService } from "../services/user.js";
import getTextFromNextMessage from "../utils/getTextFromNextMessage.js";
import dotEnv from "dotenv";

dotEnv.config();

export default async function makeAdmin(bot, msg) {
  const askPasswordMessage = await bot.sendMessage(
    msg.chat.id,
    "Введи пароль администратора"
  );
  const password = await getTextFromNextMessage(bot, askPasswordMessage);
  if (password == process.env.ADMIN_PASSWORD) {
    await makeAdminService(msg.chat.id);
    msg.user.is_admin = true;
    bot.sendMessage(msg.chat.id, "Теперь у тебя есть права администратора");
    return true;
  } else {
    bot.sendMessage(msg.chat.id, "Не верный пароль");
    return false;
  }
}
