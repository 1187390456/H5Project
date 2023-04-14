import fetch from "../fetch";

// 用户推荐列表
export const recommendList = (data) => {
  return fetch({
    url: "/api/user-identity/recommend-user-list",
    method: "post",
    headerType:2,
    data,
  });
};