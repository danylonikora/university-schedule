import fnsTz from "date-fns-tz";

export default function isWinterTime(date) {
  const offsetMls = fnsTz.getTimezoneOffset("Europe/Kiev", date);
  return offsetMls / 1000 / 60 / 60 == 2;
}
