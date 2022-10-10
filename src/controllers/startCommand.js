import COMMANDS from "../constants/commands.js";

export default function startCommandController(bot, msg) {
  const html = "Добро пожаловать";

  bot.sendMessage(msg.chat.id, html, {
    parse_mode: "HTML",
    reply_markup: {
      keyboard: [[{ text: COMMANDS.today }, { text: COMMANDS.next }]],
      resize_keyboard: true,
    },
  });
}
