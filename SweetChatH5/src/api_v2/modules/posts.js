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

// 动态评论列表
export const postsReplyList = (data) => {
  return fetch({
    url: "/api/dynamic/dynamic-reply-list",
    method: "post",
    data,
  });
};

// 动态回复
export const postsReply = (data) => {
  return fetch({
    url: "/api/dynamic/reply",
    method: "post",
    data,
  });
};

// 评论回复列表 -- 楼中楼
// export const postsToReply = (data) => {
//   return fetch({
//     url: "/api/dynamic/to-reply-list",
//     method: "post",
//     data,
//   });
// };

// 对一级评论或楼中楼的回复
export const postsReplyToReply = (data) => {
  return fetch({
    url: "/api/dynamic/reply-to-reply",
    method: "post",
    data,
  });
};
