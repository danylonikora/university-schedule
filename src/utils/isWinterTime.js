import fnsTz from "date-fns-tz";

export default function isWinterTime(date) {
  return fnsTz.getTimezoneOffset("Europe/Kiev", date) == 2;
}
