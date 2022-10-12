import { turnNotifications } from "../services/user.js";
import controllButtonsController from "./commandButtons.js";

export default async function turnOnNotificationsController(bot, msg) {
  await turnNotifications("on", msg.chat.id);
  controllButtonsController(bot, msg, "Уведомления включены");
}
