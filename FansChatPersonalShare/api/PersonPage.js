import axios from "./index";
require("es6-promise").polyfill();

// 个人主页
export const homepage = (data) => {
  return axios.request({
    url: "api/user-info/web-homepage",
    method: "post",
    data,
    createJSON: true,
  });
};

// 相册列表
export const photolist = (data) => {
  return axios.request({
    url: "api/user-info/web-photo-list",
    method: "post",
    data,
    createJSON: true,
  });
};

// 动态列表
export const recommendDynamic = (data) => {
  return axios.request({
    url: "api/dynamic/web-user-dynamic-list",
    method: "post",
    data,
    createJSON: true,
  });
};

// 链接记录
export const bloggerUrlRecord = (data) => {
  return axios.request({
    url: "api/statistic/blogger-url-record",
    method: "post",
    data,
    createJSON: true,
  });
};
