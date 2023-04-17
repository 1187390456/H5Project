import { bloggerUrlRecord } from "../../api/PersonPage";

// 跳转地址
export var jumpUrl = "https://sweetfans.love/"; // https://fanschat.kr-cell.com/
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
// 获取地址参数
export function getParams() {
  var u;
  var t;

  var url = window.location.href;
  var index = url.lastIndexOf("/");
  var targetStr = url.substring(index + 1, url.length);

  var fenge = targetStr.lastIndexOf("-");

  if (fenge == -1) {
    // 没分割符
    u = targetStr;
    t = -1;
  } else {
    // 有分割符
    var index1 = targetStr.lastIndexOf("-");
    t = targetStr.substring(index1 + 1, targetStr.length); // 分隔符的后面t
    u = targetStr.substring(0, index1); // 分隔符的前面u
  }

  // u = parseFloat(u);
  // t = parseFloat(t);
  return {
    u,
    t,
  };
}

// 记录 1 链接 2 跳转
export function recordHand(type) {
  var u = getParams().u;
  if (u == null) return;
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
// 环境判断

export const cantOpen = () => {
  var ua = navigator.userAgent.toLowerCase();
  if (/(WeiBo)/i.test(ua)) {
    return true;
  } else {
    return false;
  }
};
// 机型判断
export const isiOS = () => {
  const u = navigator.userAgent;
  const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  return isiOS;
};

// 弹窗
export const pop = function (text, time = 2) {
  console.log(text);
  var popDiv = document.createElement("div");
  popDiv.innerHTML = text;
  popDiv.className = "pop";
  const css = {
    position: "fixed",
    "text-align": "center",
    padding: "0.42672rem",
    overflow: "hidden",
    margin: "0 auto",
    width: "11.2014rem",
    "background-color": "rgba(0, 0, 0, 0.8)",
    color: "rgba(255, 255, 255, 0.8)",
    "border-radius": "0.42672rem",
    left: "0",
    right: "0",
    top: "18.669rem",
  };
  for (const key in css) {
    popDiv.style[key] = css[key];
  }
  document.body.appendChild(popDiv);
  setTimeout(function () {
    document.body.removeChild(popDiv);
  }, time * 1000);
};

// 环境判断 是否是移动端
export const _isMobile = function () {
  let flag = navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  );
  return flag;
};

// OPenInstall 监听下载 监听listenObj.type
export function listenDownInfo(type, listenObj) {
  var userID = getParams().u;
  var datajson = {};

  if (type == 0) {
    // 博主
    datajson = { jumpType: { type: "becomeBlogger", jsonData: {} } };
  } else if (type == 1) {
    // 粉丝
    datajson = { jumpType: { type: "becomeFans", jsonData: { userID } } };
  } else {
    // 路人
  }
  localStorage.setItem("datajson", JSON.stringify(datajson));

  const s = document.createElement("script");
  s.type = "text/javascript";
  s.src = "https://web.cdn.openinstall.io/openinstall.js";
  s.addEventListener(
    "load",
    () => {
      new OpenInstall(
        {
          appKey: "phbish",
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
