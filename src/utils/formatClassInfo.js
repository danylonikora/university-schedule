import CLASSES from "../constants/classes.js";

export default function formatClassInfo(cls) {
  let html = "";
  html += `<strong>${cls.index + 1}. ${cls.name} (${cls.type})</strong>`;
  html += "\n";
  html += `${CLASSES.timelines[cls.index]}`;
  html += "\n";
  html += `В ${cls.location}`;
  if (cls.link_to_video_call) {
    html += "\n";
    html += cls.link_to_video_call;
  }
  return html;
}
