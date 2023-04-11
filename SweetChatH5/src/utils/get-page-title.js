import defaultSettings from "@/settings";

const title = defaultSettings.title || "FansBridge代运营";

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`;
  }
  return `${title}`;
}
