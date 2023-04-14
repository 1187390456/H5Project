import fetch from "../fetch";

// 登录 -- 第三方授权登录
export const commonLogin = (data) => {
  return fetch({
    url: "/api/user-account/common-account-login",
    method: "post",
    // createLogin: true,
    data,
  });
};

// 登录 -- 第三方授权登录
export const phoneLogin = (data) => {
  return fetch({
    url: "/api/user-account/login-by-phone",
    method: "post",
    // createLogin: true,
    headerType: 1,
    data,
  });
};

// 获取OSS sts
export const getSts = (data) => {
  return fetch({
    url: "/api/oss/sts",
    method: "post",
    headerType: 1, // 头部信息
    data,
  });
};
