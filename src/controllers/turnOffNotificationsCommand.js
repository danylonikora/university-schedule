import { turnNotifications } from "../services/user.js";
import controllButtonsController from "./commandButtons.js";

export default async function turnOffNotificationsController(bot, msg) {
  await turnNotifications("off", msg.chat.id);
  controllButtonsController(bot, msg, "Уведомления вылючены");
}
