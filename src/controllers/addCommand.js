import CLASSES from "../constants/classes.js";
import * as fns from "date-fns";
import { addClass } from "../services/class.js";
import getStartOfDayTimestamp from "../utils/getStartOfDayTimestamp.js";
import getTextFromNextMessage from "../utils/getTextFromNextMessage.js";
import getCallbackData from "../utils/getCallbackData.js";
import isWinterTime from "../utils/isWinterTime.js";

export default async function addCommandController(bot, msg) {
  const input = {};

  const classNameInlineButtons = CLASSES.names.map((cls) => [
    { text: cls, callback_data: cls },
  ]);
  const className = await getCallbackData(
    bot,
    msg.chat.id,
    "Предмет",
    classNameInlineButtons
  );
  input.name = className;

  let previousClassIndexInlineButton = {};
  const classIndexInlineButtons = new Array(7)
    .fill()
    .map((_, i) => {
      const inlineButton = { text: String(i + 1), callback_data: String(i) };

      if (i != 0 && (i + 1) % 2 == 0) {
        return [previousClassIndexInlineButton, inlineButton];
      } else {
        previousClassIndexInlineButton = inlineButton;
        return null;
      }
    })
    .filter((value) => value !== null);
  const classIndex = await getCallbackData(
    bot,
    msg.chat.id,
    "Номер пары",
    classIndexInlineButtons
  );
  input.index = Number(classIndex);

  let isTwoClasses;
  if (input.index < 5) {
    const isTwoClassesInlineButtons = [
      [
        { text: "Да", callback_data: "true" },
        { text: "Нет", callback_data: "false" },
      ],
    ];
    isTwoClasses =
      (await getCallbackData(
        bot,
        msg.chat.id,
        "Добавить две пары подряд?",
        isTwoClassesInlineButtons
      )) == "true"
        ? true
        : false;
  } else {
    isTwoClasses = false;
  }

  const classTypeInlineButtons = CLASSES.types.map((type) => [
    { text: type, callback_data: type },
  ]);
  const classType = await getCallbackData(
    bot,
    msg.chat.id,
    "Тип",
    classTypeInlineButtons
  );
  input.type = classType;

  const classSubgroupInlineButtons = [
    [
      { text: "Для всех", callback_data: "0" },
      { text: "1", callback_data: "1" },
      { text: "2", callback_data: "2" },
    ],
  ];
  const classSubroup = await getCallbackData(
    bot,
    msg.chat.id,
    "Подгруппа",
    classSubgroupInlineButtons
  );
  input.subgroup = Number(classSubroup);

  let currentClassDateInlineButtonsRow = [];
  const classDateInlineButtons = new Array(30)
    .fill()
    .map((_, i) => {
      const currentDate = fns.addDays(msg.date * 1000, i);
      const inlineButton = {
        text: fns.format(currentDate, "dd.MM.yyyy"),
        callback_data: currentDate.getTime(),
      };

      if (i != 0 && (i + 1) % 3 == 0) {
        const temp = currentClassDateInlineButtonsRow;
        currentClassDateInlineButtonsRow = [];
        return [...temp, inlineButton];
      } else {
        currentClassDateInlineButtonsRow.push(inlineButton);
        return null;
      }
    })
    .filter((value) => value !== null);
  const classDateTimestamp = Number(
    await getCallbackData(bot, msg.chat.id, "Дата", classDateInlineButtons)
  );
  input.date = getStartOfDayTimestamp(classDateTimestamp);
  input.start = CLASSES.startUtcTimestamps[input.index] + input.date;
  input.end = CLASSES.endUtcTimestamps[input.index] + input.date;

  const classLocationInlineButtons = [
    CLASSES.locations.online.map((location) => ({
      text: location,
      callback_data: location,
    })),
  ];
  const classLocation = await getCallbackData(
    bot,
    msg.chat.id,
    "Место проведения",
    classLocationInlineButtons
  );
  input.location = classLocation;

  if (isWinterTime(input.date)) {
    // add 1 hour to start and end dates
    input.start += fns.hoursToMilliseconds(1);
    input.end += fns.hoursToMilliseconds(1);
  }

  const linkMessage = await bot.sendMessage(msg.chat.id, "Ссылка");
  const classLink = await getTextFromNextMessage(bot, linkMessage);
  input.link_to_video_call = classLink;

  let newClass;
  let newSecondClass;
  if (isTwoClasses) {
    [newClass, newSecondClass] = await Promise.all([
      addClass(input),
      addClass({
        ...input,
        index: input.index + 1,
        start: CLASSES.startUtcTimestamps[input.index + 1] + input.date,
        end: (input.end =
          CLASSES.endUtcTimestamps[input.index + 1] + input.date),
      }),
    ]);
  } else {
    newClass = await addClass(input);
  }
  let text = "";
  text += `1. ${JSON.stringify(newClass, null, 2)}`;
  if (isTwoClasses) {
    text += "\n\n";
    text += `2. ${JSON.stringify(newSecondClass, null, 2)}`;
  }
  bot.sendMessage(msg.chat.id, text);
}
