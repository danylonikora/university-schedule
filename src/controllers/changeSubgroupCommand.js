import { changeUserSubgroup, findUser } from "../services/user.js";

export default async function changeSubgroupController(bot, msg) {
  const user = await findUser(msg.chat.id);
  let currentSubgroup = user.subgroup;
  let newSubgroup;
  if (currentSubgroup == 1) {
    newSubgroup = 2;
  } else {
    newSubgroup = 1;
  }

  await changeUserSubgroup(msg.chat.id, newSubgroup);
  bot.sendMessage(
    msg.chat.id,
    `Теперь тебе будет показываться расписание для ${newSubgroup} подгруппы`
  );
}
