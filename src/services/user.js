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
