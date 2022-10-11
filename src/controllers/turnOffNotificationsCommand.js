import { turnNotifications, findUser } from "../services/user.js";
import commandsButtonsController from "./commandsButtons.js";

export default async function turnOffNotificationsController(bot, msg) {
  await turnNotifications("off", msg.chat.id);
  const user = await findUser(msg.chat.id);
  commandsButtonsController(bot, user, "Уведомления вылючены");
}
