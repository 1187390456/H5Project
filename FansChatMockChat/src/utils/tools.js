import { bloggerUrlRecord } from "../../api/PersonPage";

// 全局监听对象
export var listenObj = {
  type: false,
  isChache: false,
};
// 获取地址参数
export function getUrlKey(name) {
  return (
    decodeURIComponent(
      (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
        location.href
      ) || [, ""])[1].replace(/\+/g, "%20")
    ) || null
  );
}
// 记录 1 链接 2 跳转
export function recordHand(type) {
  var u = getUrlKey("u");
  var data = { userID: u, bloggerUserID: u, type };
  bloggerUrlRecord(data).then((res) => {
    if (!res.result) {
      console.log("record error " + data.type);
      return false;
    }
    console.log("record " + data.type);
    return true;
  });
}
// OPenInstall 监听下载 监听listenObj.type
export function listenDownInfo(datajson, listenObj) {
  const s = document.createElement("script");
  s.type = "text/javascript";
  s.src = "https://web.cdn.openinstall.io/openinstall.js";
  s.addEventListener(
    "load",
    () => {
      new OpenInstall(
        {
          appKey: "bkpxqm",
          onready: function () {
            var m = this;
            m.schemeWakeup();
            // 属性监听
            Object.defineProperty(listenObj, "type", {
              configurable: false,
              set: function () {
                console.log(datajson);
                m.wakeupOrInstall();
                return false;
              },
              get: function () {},
            });
          },
        },
        datajson
      );
    },
    false
  );
  document.head.appendChild(s);
}
