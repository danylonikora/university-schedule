import { turnNotifications, findUser } from "../services/user.js";
import commandsButtonsController from "./commandsButtons.js";

export default async function turnOnNotificationsController(bot, msg) {
  await turnNotifications("on", msg.chat.id);
  const user = await findUser(msg.chat.id);
  commandsButtonsController(bot, user, "Уведомления включены");
}
