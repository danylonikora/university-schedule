import Class from "../models/class.js";
import getStartOfDayTimestamp from "../utils/getStartOfDayTimestamp.js";

export async function addClass(input) {
  return Class.create(input);
}

export async function getClassesByDate(date, subgroup) {
  return Class.aggregate([
    {
      $match: {
        subgroup: { $in: [0, subgroup] },
        date: new Date(getStartOfDayTimestamp(date)),
      },
    },
    { $sort: { start: 1 } },
  ]);
}

export async function getNextClass(date, subgroup) {
  const nextClasses = await Class.aggregate([
    {
      $match: {
        subgroup: { $in: [0, subgroup] },
        start: { $gt: date },
      },
    },
    { $sort: { start: 1 } },
  ]);
  return nextClasses[0];
}

export async function getAllNonEmptySchedules(date, subgroup) {
  const allNonEmptySchedules = await Class.aggregate([
    {
      $match: {
        subgroup: { $in: [0, subgroup] },
        start: { $gt: date },
      },
    },
    { $sort: { start: 1 } },
    { $group: { _id: "$date", classes: { $push: "$$ROOT" } } },
    { $sort: { _id: 1 } },
    { $project: { _id: 0, date: "$_id", classes: 1 } },
  ]);
  return allNonEmptySchedules;
}
