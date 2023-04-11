import fetch from "../fetch";

// 在线状态
export const onlineInfo = (data) => {
  return fetch({
    url: "/api/user/online-status-list",
    method: "post",
    data,
  });
};
