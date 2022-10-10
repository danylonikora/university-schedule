import makeAdminController from "../controllers/makeAdmin.js";

export default async function requireAdmin(bot, msg, next) {
  if (msg.user.is_admin) {
    next();
  } else {
    const isAdmin = await makeAdminController(bot, msg);
    if (isAdmin) {
      next();
    }
  }
}
