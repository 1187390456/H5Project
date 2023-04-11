/*
 * @Page:
 * @Version: 1.0.0
 * @Autor: xumeng
 * @Date: 2020-05-05 14:36:47
 * @LastEditors: YueAo7
 * @LastEditTime: 2021-09-14 16:44:53
 */
// 测试服配置
const PRODUCTION = process.env.NODE_ENV === "production";
let baseURL;
// 浏览器下载地址
const chromeDownUrl =
  "http://activity.timing360.com/browserDownload/ChromeSetup.exe";
if (process.env.VUE_APP_MODE === "dev") {
  baseURL = "http://47.254.172.49";
} else if (process.env.VUE_APP_MODE === "test") {
  // 测试环境
  baseURL = "http://47.254.172.49";
} else if (process.env.VUE_APP_MODE === "stage") {
  // 灰度环境
  baseURL = PRODUCTION ? "http://47.254.129.90:84" : "https://fans-chat-prod-api.kr-cell.com";
} else if (process.env.VUE_APP_MODE === "release") {
  // 正式环境'
  baseURL = PRODUCTION ? "https://fans-chat-prod-api.kr-cell.com" : "";
}

export { baseURL, chromeDownUrl };
