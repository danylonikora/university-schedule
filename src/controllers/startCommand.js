import COMMANDS from "../constants/commands.js";
import controllButtonsController from "./commandButtons.js";

export default async function startCommandController(bot, msg) {
  let html = "Привет 🙋, вот список команд этого бота:";
  html += "\n\n";
  html += `- ${COMMANDS.whole}`;
  html += "\n";
  html += `- ${COMMANDS.next} (если в данный момент уже идёт пара, возвращает следующую после неё)`;
  html += "\n";
  html += `- ${COMMANDS.turnOnNotifications} - уведомления за 5 минут до начала пар`;
  html += "\n";
  html += `- ${COMMANDS.changeSubgroup}`;

  controllButtonsController(bot, msg, html, { parse_mode: "HTML" });
}
