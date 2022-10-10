import { createUser } from "../services/user.js";
import getCallbackData from "../utils/getCallbackData.js";

export default async function registerUserController(bot, msg) {
  const subgroupInlineButtons = [
    [
      { text: "1", callback_data: "1" },
      { text: "2", callback_data: "2" },
    ],
  ];

  const userSubgroup = await getCallbackData(
    bot,
    msg.chat.id,
    "Выбери номер своей подгруппы",
    subgroupInlineButtons,
    1000 * 60 * 5
  );

  return createUser({
    _id: msg.chat.id,
    name: msg.from.first_name,
    subgroup: userSubgroup,
    is_admin: false,
  });
}
