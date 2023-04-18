import fetch from "../fetch";

export const homepage = (data) => {
  return fetch({
    url: "/api/user-info/homepage",
    method: "post",
    data,
  });
};

// 相册列表
export const photolist = (data) => {
  return fetch({
    url: "/api/user-info/photo-list",
    method: "post",
    data,
  });
};

// 动态列表
export const recommendDynamic = (data) => {
  return fetch({
    url: "/api/dynamic/user-dynamic-list",
    method: "post",
    data,
  });
};
