import { createUser } from "../services/user.js";
import getCallbackData from "../utils/getCallbackData.js";

export default async function registerUserController(bot, msg) {
  let html = "";
  html += "Выбери номер своей подгруппы";
  html += "\n";
  html += "1 - бизнес планирование";
  html += "\n";
  html += "2 - интернет технологии";

  const subgroupInlineButtons = [
    [
      { text: "1", callback_data: "1" },
      { text: "2", callback_data: "2" },
    ],
  ];

  const userSubgroup = await getCallbackData(
    bot,
    msg.chat.id,
    html,
    subgroupInlineButtons,
    1000 * 60 * 5,
    { parse_mode: "HTML" }
  );

  return createUser({
    _id: msg.chat.id,
    name: msg.from.first_name,
    subgroup: userSubgroup,
    is_admin: false,
    is_notifications_on: true,
    registration_date: new Date(),
  });
}
