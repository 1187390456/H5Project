import fetch from "../fetch";

// 用户推荐列表
export const postsList = (data) => {
  return fetch({
    url: "/api/dynamic/recommend-dynamic",
    method: "post",
    headerType:2,
    data,
  });
};