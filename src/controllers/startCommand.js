import COMMANDS from "../constants/commands.js";

export default function startCommandController(bot, msg) {
  let html = "Привет 🙋, вот список команд этого бота:";
  html += "\n\n";
  html += `- ${COMMANDS.whole}`;
  html += "\n";
  html += `- ${COMMANDS.next} (если в данный момент уже идёт пара, возвращает следующую после неё)`;

  bot.sendMessage(msg.chat.id, html, {
    parse_mode: "HTML",
    reply_markup: {
      keyboard: [
        [
          { text: COMMANDS.next },
          { text: COMMANDS.whole },
        ],
      ],
      resize_keyboard: true,
    },
  });
}
