import COMMANDS from "../constants/commands.js";
import BUTTON_GROUPS from "../constants/buttonGoups.js";
import { setUserButtonGroup, findUser } from "../services/user.js";

export default async function commandButtonsController(
  bot,
  msg,
  text,
  messageOptions = {}
) {
  const user = await findUser(msg.chat.id);
  const previousButtonGroup = user.button_group;
  let nextButtonGroup;

  const buttons = {
    [BUTTON_GROUPS.main_commands]: [
      [{ text: BUTTON_GROUPS.settings }, { text: COMMANDS.next }],
      [{ text: COMMANDS.whole }],
    ],
    [BUTTON_GROUPS.settings]: [
      [
        { text: BUTTON_GROUPS.main_commands },
        { text: COMMANDS.changeSubgroup },
      ],
      [
        {
          text: user.is_notifications_on
            ? COMMANDS.turnOffNotifications
            : COMMANDS.turnOnNotifications,
        },
      ],
    ],
  };

  let currentButtons;
  if (Object.values(BUTTON_GROUPS).includes(msg.text)) {
    nextButtonGroup = Object.entries(BUTTON_GROUPS).find(
      (entry) => entry[1] == msg.text
    )[0];
    setUserButtonGroup(msg.chat.id, nextButtonGroup);
    currentButtons = buttons[msg.text];
  } else {
    currentButtons = buttons[BUTTON_GROUPS[user.button_group]];
  }

  let finalText;
  if (text) {
    finalText = text;
  } else {
    finalText = `${BUTTON_GROUPS[previousButtonGroup]} → ${BUTTON_GROUPS[nextButtonGroup]}`;
  }

  return bot.sendMessage(user._id, finalText, {
    ...messageOptions,
    reply_markup: {
      keyboard: currentButtons,
      resize_keyboard: true,
    },
  });
}
