import fetch from "../fetch";

// 我的收益记录(包括提现)
export const incomeRecordList = (data) => {
  return fetch({
    url: "/api/wallet/income-record-list",
    method: "post",
    data,
  });
};

// 钱包收支明细
export const walletRecordList = (data) => {
  return fetch({
    url: "/api/wallet/consume-record-list",
    method: "post",
    data,
  });
};

// 我的页面
export const mineInfo = (data) => {
  return fetch({
    url: "/api/user-info/mine",
    method: "post",
    data,
  });
};

// 修改头像
export const changeAvatar = (data) => {
  return fetch({
    url: "/api/user-info/change-avatar",
    method: "post",
    data,
  });
};

// 修改用户资料
export const changeUserinfo = (data) => {
  return fetch({
    url: "/api/user-info/modify-user-info",
    method: "post",
    data,
  });
};
// 复制链接
export const inviteUrl = (data) => {
  return fetch({
    url: "/api/user-info/invite-url",
    method: "post",
    data,
  });
};
