import User from "../models/user.js";

export async function createUser(input) {
  return User.create(input);
}

export async function findUser(id) {
  return User.findById(id);
}

export async function makeAdmin(id) {
  return User.updateOne({ _id: id }, { $set: { is_admin: true } });
}

export async function getUsersWithNoficiationsOn() {
  return User.find({ is_notifications_on: true });
}

export async function turnNotifications(state, id) {
  return User.updateOne(
    { _id: id },
    { $set: { is_notifications_on: state == "on" ? true : false } }
  );
}

export async function addUserActivity(id, activity, date) {
  return User.updateOne(
    { _id: id },
    { $push: { activity: { activity, date } } }
  );
}

export async function setUserButtonGroup(id, buttonGroup) {
  return User.updateOne({ _id: id }, { $set: { button_group: buttonGroup } });
}

export async function changeUserSubgroup(id, subgroup) {
  return User.updateOne({ _id: id }, { $set: { subgroup } });
}
