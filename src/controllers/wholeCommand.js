import { getAllNonEmptySchedules } from "../services/class.js";
import formatScheduleInfo from "../utils/formatScheduleInfo.js";
import InlineButtonBuilder from "../utils/InlineButtonBuilder.js";

export default async function wholeCommandController(bot, msg) {
  const schedules = await getAllNonEmptySchedules(
    new Date(msg.date * 1000),
    msg.user.subgroup
  );
  const ibb = new InlineButtonBuilder(
    schedules.map((schedule) => schedule.date.getTime())
  );
  let currentPageIndex = 0;
  let inlineButtons = ibb.getPaginatedButtons(currentPageIndex);

  const message = await bot.sendMessage(
    msg.chat.id,
    formatScheduleInfo(schedules[currentPageIndex]),
    { parse_mode: "HTML", reply_markup: { inline_keyboard: inlineButtons } }
  );

  bot.on("callback_query", (callbackQuery) => {
    if (callbackQuery.message.message_id != message.message_id) {
      return;
    }
    const newPageIndex = schedules.indexOf(
      schedules.find(
        (schedule) => schedule.date.getTime() == callbackQuery.data
      )
    );

    if (newPageIndex == currentPageIndex) {
      bot.answerCallbackQuery(callbackQuery.id);
      return;
    }

    currentPageIndex = newPageIndex;

    inlineButtons = ibb.getPaginatedButtons(newPageIndex);
    bot.editMessageText(formatScheduleInfo(schedules[currentPageIndex]), {
      chat_id: msg.chat.id,
      message_id: message.message_id,
      parse_mode: "HTML",
      reply_markup: { inline_keyboard: inlineButtons },
    });

    bot.answerCallbackQuery(callbackQuery.id);
  });
}
