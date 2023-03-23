import Vue from "../main";
import { getUrlKey } from "../utils/tools";

const isTestServer = true;
const tag = isTestServer ? "h_test_" : "h_";
var lastMsg = {};

var lanjie = true;

// nim 云信实例
export const ReSetIM = async function (data) {
  var that = data.vue;

  if (data.selfInfo.wyToken == null) return;

  // 存下服务器配置
  that.serverTag = tag;
  sessionStorage.setItem("serverTag", tag);

  // 获取云信参数
  var token = data.selfInfo.wyToken;
  var account = tag + data.selfInfo.id;
  var appKey = "b3a260acb5754d61d2d46ddc22351b4e";
  var nimInfo = {
    token,
    account,
    appKey,
  };

  console.log("云信请求信息");
  console.log(nimInfo);

  // 实例初始化
  that.nim = NIM.getInstance({
    debug: true,
    appKey,
    account,
    token,
    db: true, // 不使用数据库
    syncSessionUnread: true,
    syncMsgReceipts: true,
    onconnect: onConnect,
    onwillreconnect: onWillReconnect,
    ondisconnect: onDisconnect,
    onerror: onError,
    onsessions: onSessions,
    onupdatesession: onUpdateSession,
    onroamingmsgs: onRoamingMsgs,
    onofflinemsgs: onOfflineMsgs,
    onmsg: onMsg,
    oncustomsysmsg: onCustomSysMsg,
  });

  //#region 消息处理
  // 收到会话列表
  function onSessions(sessions) {
    console.log("====== 收到会话列表 ======", sessions);

    var curSession = sessions.find(
      (x) => x.id == "p2p-" + tag + that.sessionInfo.id
    );

    console.log("当前会话");
    console.log(curSession);

    that.curSession = curSession;
  }
  // 收到会话更新
  function onUpdateSession(session) {
    console.log("====== 会话更新了 ======", session);
    // that.sessionInfo.id that.selfInfo.id

    var fromId = session.lastMsg.from.slice(
      session.lastMsg.from.lastIndexOf("_") + 1
    );
    var toId = session.lastMsg.to.slice(
      session.lastMsg.to.lastIndexOf("_") + 1
    );
    console.log("收到从" + fromId + "到" + toId + "的消息");

    // 第一种情况 fromId是自己 toid 是聊天的人 推送
    var canPush1 = fromId == that.selfInfo.id && toId == that.sessionInfo.id;

    // 第二种情况 fromId是别人 toId 是自己
    var canPush2 = fromId == that.sessionInfo.id && toId == that.selfInfo.id;

    console.log("能否推送" + (canPush1 || canPush2));

    if (session.lastMsg.status == "success" && (canPush1 || canPush2)) {
      console.log("====== 会话更新了 ======", session);
      // that.GetHistory(session.id); // 更新当前会话
      session.lastMsg.isUnreadable = true;
      that.chatViewList.push(session.lastMsg); // 只接收一次并推送临时本地
    }
  }
  // im收到消息
  function onMsg(msg) {
    console.log("====== im收到消息 ======", msg);
    that.$refs.chatView.ResetScroll();
    // that.GetHistory("p2p-" + tag + that.sessionInfo.id);

    //  that.GetHistory("p2p-" + tag + that.sessionInfo.id); // 更新当前会话

    // if (msg.from == "r_" + that.questionUserId) {
    //   that.userList.map((item) => {
    //     if ("r_" + item.userInfoVo.id == msg.from) {
    //       that.nim.resetSessionUnread("p2p-r_" + that.questionUserId);
    //     }
    //   });
    //   that.getHistory("p2p-r_" + that.questionUserId);
    // }
  }
  // 连接进入云信
  function onConnect() {
    console.log("====== 云信sdk 进入IM ======");
    that.GetHistory("p2p-" + tag + that.sessionInfo.id); // 获取历史消息
  }
  //#endregion

  //#region 暂时不处理

  // 收到自定义消息
  function onCustomSysMsg(sysMsg) {
    const content = JSON.parse(sysMsg.content);
    console.log("====== 收到自定义系统通知 ======", content);
  }
  function onRoamingMsgs(obj) {
    console.log("====== im收到漫游消息 ======", obj);
  }
  function onOfflineMsgs(obj) {
    console.log("====== im收到离线消息 ======", obj);
  }

  function onWillReconnect(obj) {
    // 此时说明 SDK 已经断开连接, 请开发者在界面上提示用户连接已断开, 而且正在重新建立连接
    console.log("====== 即将重连 ======");
    console.log(obj.retryCount);
    console.log(obj.duration);
  }
  function onDisconnect(error) {
    // 此时说明 SDK 处于断开状态, 开发者此时应该根据错误码提示相应的错误信息, 并且跳转到登录页面
    console.log("====== 丢失连接 ======");
    console.log(error);
    if (error) {
      switch (error.code) {
        // 账号或者密码错误, 请跳转到登录页面并提示错误
        case 302:
          break;
        // 重复登录, 已经在其它端登录了, 请跳转到登录页面并提示错误
        case 417:
          break;
        // 被踢, 请提示错误后跳转到登录页面
        case "kicked":
          break;
        default:
          break;
      }
    }
  }
  function onError(error) {
    console.log("====== 云信报错 ======", error);
  }
  //#endregion
};

//#region 日期格式化

function change(t) {
  if (t < 10) {
    return "0" + t;
  } else {
    return t;
  }
}

export const formatDate = (date, formatStr = "YYYY-MM-DD") => {
  let d = new Date(date);
  formatStr = formatStr.replace(/YYYY/g, d.getFullYear());
  formatStr = formatStr.replace(/MM/g, change(d.getMonth() + 1));
  formatStr = formatStr.replace(/DD/g, change(d.getDate()));

  formatStr = formatStr.replace(/hh/g, change(d.getHours()));
  formatStr = formatStr.replace(/mm/g, change(d.getMinutes()));
  formatStr = formatStr.replace(/ss/g, change(d.getSeconds()));
  return formatStr;
};

//#endregion
