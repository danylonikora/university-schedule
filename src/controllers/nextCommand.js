import * as fns from "date-fns";
import ruFnsLocale from "date-fns/locale/ru/index.js";
import formatClassInfo from "../utils/formatClassInfo.js";
import { getNextClass } from "../services/class.js";

export default async function nextCommandController(bot, msg) {
  const nextClass = await getNextClass(
    new Date(msg.date * 1000),
    msg.user.subgroup
  );

  if (nextClass) {
    let html = "";
    html += `<strong>${
      fns.isToday(nextClass.start)
        ? "Сегодня"
        : fns.format(nextClass.start, "dd.MM.yyyy, EEEE", {
            locale: ruFnsLocale,
          })
    }</strong>`;
    html += "\n\n";

    html += formatClassInfo(nextClass);
    bot.sendMessage(msg.chat.id, html, {
      parse_mode: "HTML",
    });
  } else {
    bot.sendMessage(msg.chat.id, "Следующего занятия в расписании пока нет");
  }
}
