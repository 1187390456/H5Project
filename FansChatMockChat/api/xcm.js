import axios from "./index";
require("es6-promise").polyfill();

// 获取用户信息
export const userInfo = (data) => {
  return axios.request({
    url: "api/h5/get-user-info",
    method: "post",
    data,
    createJSON: true,
  });
};
