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

//退出登录
// sp_id
export const loginOut = (data) => {
  return fetch({
    url: "/login/logout",
    method: "post",
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

// 博主账号列表
export const bloggerList = (data) => {
  return fetch({
    url: "/api/backend/authorized-blogger-list",
    method: "post",
    data,
  });
};
// 切换博主账号
export const checkAccount = (data) => {
  return fetch({
    url: "/api/backend/switch-user-account",
    method: "post",
    data,
  });
};
// 取消使用博主账号
export const cancenAccount = (data) => {
  return fetch({
    url: "/api/backend/cancel-authorization",
    method: "post",
    data,
  });
};
