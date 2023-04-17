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
    data,
  });
};

// 注册编辑资料
export const registerEditInfo = (data) => {
  return fetch({
    url: "/api/user-account/register-edit-user-info",
    method: "post",
    data,
  });
};

// 获取OSS sts
export const getSts = (data) => {
  return fetch({
    url: "/api/oss/sts",
    method: "post",
    data,
  });
};
