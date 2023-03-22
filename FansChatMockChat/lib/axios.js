require("es6-promise").polyfill();
import axios from "axios";
import Qs from "qs";

import { baseURL } from "../config/index";

class HttpRequest {
  constructor(baseUrl = baseURL) {
    this.baseUrl = baseUrl;
    this.queue = {};
  }
  getInsideConfig(opt) {
    let config;
    if (opt.useSelfUrl) {
      config = {
        baseURL: "",
        headers: {
          //
        },
      };
    } else {
      config = {
        baseURL: this.baseUrl,
        headers: {
          //
        },
      };
    }
    return config;
  }
  distroy(url) {
    delete this.queue[url];
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors(instance, url) {
    instance.interceptors.request.use(
      (config) => {
        // 添加全局的loading...
        if (!Object.keys(this.queue).length) {
          // Spin.show()
        }
        this.queue[url] = true;
        // config.headers['Authorization'] = getToken()
        config.headers["Accept-Language"] = "";

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    instance.interceptors.response.use(
      (res) => {
        this.distroy(url);
        const { data } = res;
        return data;
      },
      (error) => {
        this.distroy(url);
        return Promise.reject(error.response.data);
      }
    );
  }
  request(options) {
    let instance;
    if (options.createJSON) {
      instance = axios.create({ headers: { userID: options.data.userID } }); // 新增UserID请求头
    } else {
      instance = axios.create({
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          userID: options.data.userID,
        },
        transformRequest: [
          (data) => Qs.stringify(data, { arrayFormat: "repeat" }),
        ],
      });
    }
    options = Object.assign(this.getInsideConfig(options), options);
    this.interceptors(instance, options.url);
    return instance(options);
  }
}
export default HttpRequest;
