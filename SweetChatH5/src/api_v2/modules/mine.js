import fetch from "../fetch";

// 我的收益记录(包括提现)
export const incomeRecordList = (data) => {
  return fetch({
    url: "/api/wallet/income-record-list",
    method: "post",
    data,
  });
};

// 搜索博主
export const bloggerSearch = (data) => {
  return fetch({
    url: "/api/user/blogger-search",
    method: "post",
    data,
  });
};
