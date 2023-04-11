import fetch from "../fetch";

// 我的动态列表
export const myTrendList = (data) => {
  return fetch({
    url: "/api/dynamic/user-dynamic-list",
    method: "post",
    headerType: 1, // 头部信息
    data,
  });
};

// 全部动态列表
export const allTrendList = (data) => {
  return fetch({
    url: "/api/dynamic/recommend-dynamic",
    method: "post",
    headerType: 1, // 头部信息
    data,
  });
};

// 互动通知
export const noticeList = (data) => {
  return fetch({
    url: "/api/user/notice-list",
    method: "post",
    headerType: 1, // 头部信息
    data,
  });
};

// 点赞
export const giveLike = (data) => {
  return fetch({
    url: "/api/dynamic/like",
    method: "post",
    headerType: 1, // 头部信息
    data,
  });
};

// 取消点赞
export const cancelLike = (data) => {
  return fetch({
    url: "/api/dynamic/cancel-like",
    method: "post",
    headerType: 1, // 头部信息
    data,
  });
};

// 最新互动通知
export const newUserNotice = (data) => {
  return fetch({
    url: "/api/user/user-message",
    method: "post",
    headerType: 1, // 头部信息
    data,
  });
};

// 发布动态
export const postDynamic = (data) => {
  return fetch({
    url: "/api/dynamic/post-dynamic",
    method: "post",
    headerType: 1, // 头部信息
    data,
  });
};

// 删除动态
export const deleteDynamic = (data) => {
  return fetch({
    url: "/api/dynamic/delete",
    method: "post",
    headerType: 1, // 头部信息
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

// 动态评论列表
export const dynamicReplyList = (data) => {
  return fetch({
    url: "/api/dynamic/dynamic-reply-list",
    method: "post",
    headerType: 1, // 头部信息
    data,
  });
};

// 评论回复列表（楼中楼）
export const replyToReplyList = (data) => {
  return fetch({
    url: "/api/dynamic/to-reply-list",
    method: "post",
    headerType: 1, // 头部信息
    data,
  });
};

// 对动态的回复
export const dynamicReply = (data) => {
  return fetch({
    url: "/api/dynamic/reply",
    method: "post",
    headerType: 2, // 头部信息
    data,
  });
};

// 对一级评论或楼中楼的回复
export const dynamicReplyToReply = (data) => {
  return fetch({
    url: "/api/dynamic/reply-to-reply",
    method: "post",
    headerType: 1, // 头部信息
    data,
  });
};
