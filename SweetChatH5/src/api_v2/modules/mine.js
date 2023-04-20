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

// 钱包收支明细
export const mineInfo = (data) => {
  return fetch({
    url: "/api/user-info/mine",
    method: "post",
    data,
  });
};
