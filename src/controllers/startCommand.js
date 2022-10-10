import COMMANDS from "../constants/commands.js";

export default function startCommandController(bot, msg) {
  let html = "Привет 🙋, вот список команд этого бота:";
  html += "\n\n";
  html += `- ${COMMANDS.today}`;
  html += "\n";
  html += `- ${COMMANDS.next} (если в данный момент уже идёт пара, возвращает следующую после неё)`;

  bot.sendMessage(msg.chat.id, html, {
    parse_mode: "HTML",
    reply_markup: {
      keyboard: [[{ text: COMMANDS.today }, { text: COMMANDS.next }]],
      resize_keyboard: true,
    },
  });
}
