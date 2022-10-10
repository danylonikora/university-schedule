import { findUser } from "../services/user.js";
import registerUserController from "../controllers/registerUser.js";

export default async function requireUser(bot, msg, next) {
  let user = await findUser(msg.chat.id);

  if (!user) {
    user = await registerUserController(bot, msg);
  }

  msg.user = {};
  msg.user.subgroup = user.subgroup;
  msg.user.is_admin = user.is_admin;
  next();
}
