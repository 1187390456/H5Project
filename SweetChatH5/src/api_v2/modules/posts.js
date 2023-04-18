import fetch from "../fetch";

// 用户动态列表
export const postsList = (data) => {
  return fetch({
    url: "/api/dynamic/recommend-dynamic",
    method: "post",
    data,
  });
};
// 点赞
export const giveLike = (data) => {
    return fetch({
      url: "/api/dynamic/like",
      method: "post",
      data,
    });
  };
  
  // 取消点赞
  export const cancelLike = (data) => {
    return fetch({
      url: "/api/dynamic/cancel-like",
      method: "post",
      data,
    });
  };
  // 发布动态
  export const postDynamic = (data) => {
    return fetch({
      url: "/api/dynamic/post-dynamic",
      method: "post",
      data,
    });
  };