import fetch from "../fetch";

// 我的页面 - 基础信息
export const edit_mineInfo = (data) => {
  return fetch({
    url: "/api/user-info/mine",
    method: "post",
    headerType: 2,
    data,
  });
};

// 修改头像
export const edit_mineAvatar = (data) => {
  return fetch({
    url: "/api/user-info/change-avatar",
    method: "post",
    headerType: 2,
    data,
  });
};

// 修改用户资料
export const edit_modifyInfo = (data) => {
  return fetch({
    url: "/api/user-info/modify-user-info",
    method: "post",
    headerType: 2,
    data,
  });
};
