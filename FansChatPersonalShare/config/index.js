let baseURL, browerUrl;
if (process.env.VUE_APP_MODE === "dev") {
  baseURL = "https://fans-chat-prod-api.kr-cell.com/"; // 本地
} else if (process.env.VUE_APP_MODE === "test") {
  baseURL = "https://fans-chat-prod-api.kr-cell.com/"; //测试
} else if (process.env.VUE_APP_MODE === "stage") {
  baseURL = "";
} else if (process.env.VUE_APP_MODE === "release") {
  baseURL = "https://fans-chat-prod-api.kr-cell.com/";
}

export { baseURL, browerUrl };
