export default function getStartOfDayTimestamp(date) {
  let timestamp;
  if (date instanceof Date) {
    timestamp = date.getTime();
  } else if (typeof date == "number") {
    timestamp = date;
  } else {
    throw new TypeError(
      "date parameter has to be instance of Date class or number"
    );
  }

  const DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;
  const amountOfDays = timestamp / DAY_IN_MILLISECONDS;
  const startOfDayTimestamp = Math.floor(amountOfDays) * DAY_IN_MILLISECONDS;
  return startOfDayTimestamp;
}
