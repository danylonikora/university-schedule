import startCommandController from "./controllers/startCommand.js";
import nextCommandController from "./controllers/nextCommand.js";
import addCommandController from "./controllers/addCommand.js";
import COMMANDS from "./constants/commands.js";
import requireUser from "./middlewares/requireUser.js";
import requireAdmin from "./middlewares/requireAdmin.js";
import wholeCommandController from "./controllers/wholeCommand.js";
import turnOffNotificationsController from "./controllers/turnOffNotificationsCommand.js";
import turnOnNotificationsController from "./controllers/turnOnNotificationsCommand.js";

export default function commands(bot) {
  bot.on("message", (msg) => {
    requireUser(bot, msg, commandsSwitch.bind(null, msg));
  });

  function commandsSwitch(msg) {
    console.log(msg);
    switch (msg.text) {
      case COMMANDS.next:
        nextCommandController(bot, msg);
        break;
      case COMMANDS.whole:
        wholeCommandController(bot, msg);
        break;
      case COMMANDS.add:
        requireAdmin(bot, msg, addCommandController.bind(null, bot, msg));
        break;
      case COMMANDS.turnOffNotifications:
        turnOffNotificationsController(bot, msg);
        break;
      case COMMANDS.turnOnNotifications:
        turnOnNotificationsController(bot, msg);
        break;
      case COMMANDS.start:
        startCommandController(bot, msg);
        break;
    }
  }
}
