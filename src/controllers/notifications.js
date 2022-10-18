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

  // TODO: consider DTS in intervals and timeouts
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
      
      const mlsToNotification =
        DAY_IN_MILLISECONDS - MILLISECONDS_BEFORE_NOTIFICATION;
      setInterval(() => {
        notifyUsers(new Date());
      }, mlsToNotification);
    }, timeoutMls);
  });

  async function notifyUsers(date) {
    const [firstGroupNextClass, secondGroupNextClass, users] =
      await Promise.all([
        getNextClass(date, 1),
        getNextClass(date, 2),
        getUsersWithNoficiationsOn(),
      ]);
    const startOfDayTmp = getStartOfDayTimestamp(date);

    if (
      firstGroupNextClass &&
      startOfDayTmp == firstGroupNextClass.date.getTime()
    ) {
      users.forEach((user) => {
        if (user.subgroup != 1) {
          return;
        }

        bot.sendMessage(user._id, formatNotification(firstGroupNextClass), {
          parse_mode: "HTML",
        });
      });
    } else if (
      secondGroupNextClass &&
      startOfDayTmp == secondGroupNextClass.date.getTime()
    ) {
      users.forEach((user) => {
        if (user.subgroup != 2) {
          return;
        }

        bot.sendMessage(user._id, formatNotification(secondGroupNextClass), {
          parse_mode: "HTML",
        });
      });
    }
  }
}

function formatNotification(cls) {
  let html = "";
  html += `${cls.name} (${cls.type}) скоро начнётся`;
  html += "\n";
  html += cls.link_to_video_call;

  return html;
}
