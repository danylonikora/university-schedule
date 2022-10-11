import { getUsersWithNoficiationsOn } from "../services/user.js";
import { getNextClass } from "../services/class.js";
import getStartOfDayTimestamp from "../utils/getStartOfDayTimestamp.js";
import CLASSES from "../constants/classes.js";
import MILLISECONDS_BEFORE_NOTIFICATION from "../constants/millisecondsBeforeNotification.js";

const DAY_IN_MILLISECONDS = 86400000;

export default function notificationsController(bot) {
  const now = Date.now();
  const mlsFromStartOfDay = now - getStartOfDayTimestamp(now);
  const classesStartTmps = CLASSES.startUtcTimestamps;
  let mlsToNextClass;
  let nextClassInx;
  let nextClassTmp;
  let isNextClassToday;

  // if all classes finnished today
  if (mlsFromStartOfDay > classesStartTmps[classesStartTmps.length - 1]) {
    isNextClassToday = false;
    nextClassTmp = classesStartTmps[0];
    nextClassInx = 0;
    mlsToNextClass = DAY_IN_MILLISECONDS + nextClassTmp - mlsFromStartOfDay;
  } else {
    isNextClassToday = true;
    nextClassTmp = classesStartTmps.find((tmp) => tmp > mlsFromStartOfDay);
    nextClassInx = classesStartTmps.indexOf(nextClassTmp);
    mlsToNextClass = nextClassTmp - mlsFromStartOfDay;
  }

  classesStartTmps.forEach((tmp, i) => {
    let timeoutMls;
    if (i == nextClassInx) {
      timeoutMls = mlsToNextClass;
    } else {
      if (isNextClassToday && i < nextClassInx) {
        timeoutMls = DAY_IN_MILLISECONDS - (mlsFromStartOfDay - tmp);
      } else {
        timeoutMls = tmp - nextClassTmp + mlsToNextClass;
      }
    }

    timeoutMls -= MILLISECONDS_BEFORE_NOTIFICATION;
    setTimeout(() => {
      notifyUsers(new Date());
      setInterval(
        () => notifyUsers(new Date()),
        DAY_IN_MILLISECONDS - MILLISECONDS_BEFORE_NOTIFICATION
      );
    }, timeoutMls);
  });

  async function notifyUsers(date) {
    const nextClass = await getNextClass();

    // if next class in not today
    if (getStartOfDayTimestamp(date) != nextClass.date) {
      return;
    }

    const users = await getUsersWithNoficiationsOn();
    let html = "";
    html += `${nextClass.name} (${nextClass.type}) скоро начнётся`;
    html += "\n";
    html += nextClass.link_to_video;
    users.forEach((user) =>
      bot.sendMessage(user._id, html, {
        parse_mode: "HTML",
      })
    );
  }
}
