import * as fns from "date-fns";
import formatClassInfo from "../utils/formatClassInfo.js";
import { getClassesByDate } from "../services/class.js";

export default async function todayCommandController(bot, msg) {
  const todaysSchedule = await getClassesByDate(
    msg.date * 1000,
    msg.user.subgroup
  );

  if (todaysSchedule.length > 0) {
    let html = `<strong>Расписание на ${fns.format(
      msg.date * 1000,
      "dd.MM.yyyy"
    )} </strong>`;
    html += "\n\n";
    html += todaysSchedule.map((cls) => formatClassInfo(cls)).join("\n\n");

    bot.sendMessage(msg.chat.id, html, {
      parse_mode: "HTML",
    });
  } else {
    bot.sendMessage(msg.chat.id, "Расписания на сегодня нет");
  }
}
