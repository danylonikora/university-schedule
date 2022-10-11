import COMMANDS from "../constants/commands.js";
import commandsButtonsController from "./commandsButtons.js";
import { findUser } from "../services/user.js";

export default async function startCommandController(bot, msg) {
  let html = "Привет 🙋, вот список команд этого бота:";
  html += "\n\n";
  html += `- ${COMMANDS.whole}`;
  html += "\n";
  html += `- ${COMMANDS.next} (если в данный момент уже идёт пара, возвращает следующую после неё)`;
  html += "\n";
  html += `- ${COMMANDS.turnOnNotifications} - уведомления за 10 минут до начала пар`;

  const user = await findUser(msg.chat.id);
  commandsButtonsController(bot, user, html, { parse_mode: "HTML" });
}
