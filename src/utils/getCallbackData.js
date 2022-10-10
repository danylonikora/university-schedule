export default async function getCallbackData(
  bot,
  chatId,
  messageText,
  inlineButtons,
  maxListeningTime = 0,
  messageOptions = {}
) {
  const sentMessage = await bot.sendMessage(chatId, messageText, {
    ...messageOptions,
    reply_markup: {
      inline_keyboard: inlineButtons,
    },
    resize_keyboard: true,
  });

  return new Promise((resolve) => {
    bot.on("callback_query", callbackQueryHandler);

    let timeoutId;
    if (maxListeningTime > 0) {
      timeoutId = setTimeout(
        () => bot.off("callback_query", callbackQueryHandler),
        maxListeningTime
      );
    }

    function callbackQueryHandler(callbackQuery) {
      if (callbackQuery.message.message_id == sentMessage.message_id) {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        bot.off("callback_query", callbackQueryHandler);

        bot.answerCallbackQuery(callbackQuery.id);

        resolve(callbackQuery.data);
      }
    }
  });
}
