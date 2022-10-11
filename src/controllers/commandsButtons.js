import COMMANDS from "../constants/commands.js";

export default async function commandsButtonsController(
  bot,
  user,
  text,
  messageOptions = {}
) {
  return bot.sendMessage(user._id, text, {
    ...messageOptions,
    reply_markup: {
      keyboard: [
        [
          {
            text: user.is_notifications_on
              ? COMMANDS.turnOffNotifications
              : COMMANDS.turnOnNotifications,
          },
          { text: COMMANDS.next },
          { text: COMMANDS.whole },
        ],
      ],
      resize_keyboard: true,
    },
  });
}
