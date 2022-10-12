import { addUserActivity } from "../services/user.js";
import COMMANDS from "../constants/commands.js";

export default function activityMiddleware(_, msg, next) {
  if (Object.values(COMMANDS).includes(msg.text)) {
    addUserActivity(
      msg.chat.id,
      Object.entries(COMMANDS).find((entry) => entry[1] == msg.text)[0],
      new Date(msg.date * 1000)
    );
  }
  next();
}
