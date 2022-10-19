import { getUsersWithNoficiationsOn } from "../services/user.js";
import { getNextClass } from "../services/class.js";
import CLASSES from "../constants/classes.js";
import MILLISECONDS_BEFORE_NOTIFICATION from "../constants/millisecondsBeforeNotification.js";

export default async function notificationsController(bot) {
  async function recSetNotificationTimeouts() {
    const date = new Date();
    const now = date.getTime();
    const [firstSubgroupNextClass, secondSubgroupNextClass] = await Promise.all(
      [getNextClass(date, 1), getNextClass(date, 2)]
    );
    if (!firstSubgroupNextClass || !secondSubgroupNextClass) {
      return;
    }
    const firstNextClassStartTmp = firstSubgroupNextClass.date.getTime();
    const secondNextClassStartTmp = secondSubgroupNextClass.date.getTime();
    const mlsToFirstNextClass =
      firstNextClassStartTmp +
      CLASSES.startUtcTimestamps[firstSubgroupNextClass.index] -
      now;
    const mlsToSecondNextClass =
      secondNextClassStartTmp +
      CLASSES.startUtcTimestamps[secondSubgroupNextClass.index] -
      now;

    await Promise.all([
      new Promise((resolve) => {
        if (
          mlsToFirstNextClass < MILLISECONDS_BEFORE_NOTIFICATION ||
          firstNextClassStartTmp > secondNextClassStartTmp
        ) {
          resolve();
          return;
        }
        setTimeout(() => {
          notifyUsers(firstSubgroupNextClass, 1);
          resolve();
        }, mlsToSecondNextClass - MILLISECONDS_BEFORE_NOTIFICATION);
      }),
      new Promise((resolve) => {
        if (
          mlsToSecondNextClass < MILLISECONDS_BEFORE_NOTIFICATION ||
          secondNextClassStartTmp > firstNextClassStartTmp
        ) {
          resolve();
          return;
        }
        setTimeout(() => {
          notifyUsers(secondSubgroupNextClass, 2);
          resolve();
        }, mlsToSecondNextClass - MILLISECONDS_BEFORE_NOTIFICATION);
      }),
    ]);

    recSetNotificationTimeouts();
  }
  recSetNotificationTimeouts();

  async function notifyUsers(cls, subgroup) {
    const users = await getUsersWithNoficiationsOn();
    users.forEach((user) => {
      if (user.subgroup == subgroup) {
        bot.sendMessage(user._id, formatNotification(cls), {
          parse_mode: "HTML",
        });
      }
    });
  }
}

function formatNotification(cls) {
  let html = "";
  html += `${cls.name} (${cls.type}) скоро начнётся`;
  html += "\n";
  html += cls.link_to_video_call;

  return html;
}
