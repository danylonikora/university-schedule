import formatClassInfo from "./formatClassInfo.js";
import * as fns from "date-fns";

export default function formatScheduleInfo(schedule) {
  let html = `<strong>Расписание на ${fns.format(
    schedule.date,
    "dd.MM.yyyy"
  )} </strong>`;
  html += "\n\n";
  html += schedule.classes.map((cls) => formatClassInfo(cls)).join("\n\n");

  return html;
}
