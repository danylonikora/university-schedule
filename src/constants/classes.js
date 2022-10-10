import * as fns from "date-fns";

const CLASSES = {
  startUtcTimestamps: [
    fns.hoursToMilliseconds(5) + fns.minutesToMilliseconds(20),
    fns.hoursToMilliseconds(7) + fns.minutesToMilliseconds(5),
    fns.hoursToMilliseconds(9) + fns.minutesToMilliseconds(5),
    fns.hoursToMilliseconds(10) + fns.minutesToMilliseconds(50),
    fns.hoursToMilliseconds(12) + fns.minutesToMilliseconds(25),
    fns.hoursToMilliseconds(14),
    fns.hoursToMilliseconds(15) + fns.minutesToMilliseconds(30),
  ],
  endUtcTimestamps: [
    fns.hoursToMilliseconds(6) + fns.minutesToMilliseconds(40),
    fns.hoursToMilliseconds(8) + fns.minutesToMilliseconds(25),
    fns.hoursToMilliseconds(10) + fns.minutesToMilliseconds(25),
    fns.hoursToMilliseconds(12) + fns.minutesToMilliseconds(10),
    fns.hoursToMilliseconds(13) + fns.minutesToMilliseconds(45),
    fns.hoursToMilliseconds(15) + fns.minutesToMilliseconds(20),
    fns.hoursToMilliseconds(16) + fns.minutesToMilliseconds(50),
  ],
  timelines: [
    "08:20 - 09:40",
    "10:05 - 11:25",
    "12:05 - 13:25",
    "13:50 - 15:10",
    "15:25 - 16:45",
    "17:00 - 18:20",
    "18:30 - 19:50",
  ],
  names: [
    "Коммуникативный менеджмент",
    "Экономика отелей и ресторанов",
    "Интернет технологии",
    "Инжиниринг зданий",
    "Стартап тренинг",
    "Бизнес планирование",
  ],
  locations: { online: ["Zoom", "Teams"] },
  types: ["Лекция", "Практическая"],
};
export default CLASSES;
