import fetch from "../fetch";

// 相册列表
export const photoList = (data) => {
  return fetch({
    url: "/api/user-info/photo-list",
    method: "post",
    headerType:1,
    data,
  });
};
// 上传照片
export const addInfoPhoto = (data) => {
  return fetch({
    url: "/api/user-info/add-photo",
    method: "post",
    headerType:1,
    data,
  });
};
// 删除照片
export const delInfoPhoto = (data) => {
  return fetch({
    url: "/api/user-info/delete-photo",
    method: "post",
    headerType:1,
    data,
  });
};
