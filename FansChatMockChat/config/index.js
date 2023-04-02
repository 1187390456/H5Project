let baseURL, browerUrl;
if (process.env.VUE_APP_MODE === "dev") {
  console.log("dev");
  baseURL = "https://fans-chat-prod-api.kr-cell.com/"; // 正式
} else if (process.env.VUE_APP_MODE === "test") {
  console.log("test");
  baseURL = "https://fans-chat-prod-api.kr-cell.com/"; // 测试 http://47.254.172.49
} else if (process.env.VUE_APP_MODE === "stage") {
  console.log("stage");
  baseURL = "";
} else if (process.env.VUE_APP_MODE === "release") {
  console.log("release");
  baseURL = "https://fans-chat-prod-api.kr-cell.com/";
}

export { baseURL, browerUrl };
