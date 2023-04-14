/**
 * 支持断网提示
 * 请求取消
 * __noCancel字段可以让特殊的请求不被取消
 * 注意：取消请求并没有真正取消发送至服务的请求，而是取消了该请求的结果的处理，而且在B端产品中一般...
 */
import axios from "axios";
import configs from "./config";
import store from "@/store";
import Qs from "qs";

axios.defaults.retry = configs.api.retry; // 重试次数
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset = UTF-8';
axios.defaults.retryDelay = configs.api.retryDelay; // 重试延时
axios.defaults.shouldRetry = configs.api.shouldRetry; // 重试条件，默认只要是错误都需要重试
window.addEventListener("offline", function () {
  alert("当前网络已断开！");
});

export default function fetch(options) {
  console.log(options);
  let headers;
  if (options.createForm) {
    headers = {};
  } else if (options.createLogin) {
    headers = {
      bgUserID: -1,
    };
  } else {
    headers = { "Content-Type": "application/json;charset = UTF-8" };
  }
  configs.api.before_fetch && configs.api.before_fetch();
  // 超时 10s
  const instance = axios.create({
    baseURL: options && options.selfUrl ? "" : configs.api.url,
    headers: headers,
    responseType: "json",
    responseEncoding: "utf8", // default
    transformRequest: [
      (data) => {
        if (options.createForm) {
          return data;
        } else if (options.createLogin) {
          return Qs.stringify(data, { arrayFormat: "repeat" });
        } else {
          return JSON.stringify(data);
        }
      },
    ],
    // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
    transformResponse: [
      (data) => {
        // 此处可以拦截某些状态做相应处理

        if (data) {
          return data;
        } else {
          alert("接口错误");
          return {
            error_code: -1,
            error_msg: "接口错误",
          };
        }
      },
    ],
    timeout: configs.api.timeout || 100000, // default is `0` (no timeout)
    withCredentials: false, // default
  });

  /**
   * 请求前拦截
   * 用于处理需要在请求前的操作
   */

  instance.interceptors.request.use(
    (config) => {
      let cusConfig = configs.api.set_config(config);
      const tempArr = config.url.split("/");
      if (tempArr[tempArr.length - 1] == "login-by-username")
        return { ...config, ...cusConfig };
      if (config.headerType && config.headerType == 1) {
        config.headers.regionCode = "US";
        config.headers["Accept-Language"] = "en-US";
        config.headers.bgUserId = "";
        config.headers.bgUserToken = "";
        // config.headers.userID = store.state.user.bloggerInfo.id;
        // config.headers.userToken = store.state.user.bloggerInfo.token;
      } else if (config.headerType && config.headerType == 2) {
        // config.headers.userID = store.state.user.bloggerInfo.id;
        // config.headers.userToken = store.state.user.bloggerInfo.token;
        config.headers.userID = 141;
        config.headers.userToken = "CdVW5ElzOMkJr0y92FsVKX3vhHb1Ride";
      } else {
        config.headers.bgUserToken = window.sessionStorage.getItem("token");
        config.headers.bgUserID = store.state.user.userId;
      }

      return { ...config, ...cusConfig };
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  /**
   * 请求响应拦截
   * 用于处理需要在请求返回后的操作
   */

  instance.interceptors.response.use(
    (response) => {
      const responseCode = response.status;
      // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
      // 否则的话抛出错误
      if (responseCode === 200) {
        return Promise.resolve(response);
      } else {
        return Promise.reject(response);
      }
    },
    (error) => {
      var config = error.config;
      // 判断是否配置了重试
      if (!config || !config.retry) {
        return Promise.reject(error);
      }

      if (!config.shouldRetry || typeof config.shouldRetry !== "function") {
        return Promise.reject(error);
      }

      // 判断是否满足重试条件
      if (!config.shouldRetry(error)) {
        return Promise.reject(error);
      }

      // 设置重置次数，默认为0
      config.__retryCount = config.__retryCount || 0;

      // 判断是否超过了重试次数
      if (config.__retryCount >= config.retry) {
        return Promise.reject(error);
      }

      // 重试次数自增
      config.__retryCount += 1;

      // 延时处理
      var backoff = new Promise(function (resolve) {
        setTimeout(function () {
          resolve();
        }, config.retryDelay || 1);
      });

      // 重新发起axios请求
      return backoff
        .then(function () {
          return axios(config);
        })
        .catch((e) => {});
    }
  );

  //   // 请求处理
  return new Promise((resolve, reject) => {
    instance(options)
      .then((res) => {
        const responseCode = res.data.errorCode;
        switch (responseCode) {
          case "1000":
            store.dispatch("user/logout");
            break;
          case "1001":
            store.dispatch("user/logout");
            break;
          case "1002":
            store.dispatch("user/logout");
            break;
          case "1003":
            store.dispatch("user/logout");
            break;
          case 106:
            store.dispatch("user/logout");
            break;
          default:
        }
        resolve(res.data);
        return false;
      })
      .catch((error) => {
        reject(error);
      });
  });
}
