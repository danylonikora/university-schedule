export default async function getTextFromNextMessage(
  bot,
  previousMessage,
  maxListeningTime = 0
) {
  return new Promise((resolve) => {
    bot.on("message", messageHandler);

    let timeoudId;
    if (maxListeningTime > 0) {
      timeoudId = setTimeout(
        () => bot.off("message", messageHandler),
        maxListeningTime
      );
    }

    function messageHandler(msg) {
      if (timeoudId) {
        clearTimeout(timeoudId);
      }
      bot.off("message", messageHandler);

      if (msg.message_id == previousMessage.message_id + 1) {
        resolve(msg.text);
      } else {
        bot.off("message", messageHandler);
      }
    }
  });
}
