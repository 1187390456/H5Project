import Vue from "../main";
import store from "../store";
import { api } from "./../api_v2";
import router from "../router";

const isTestServer = true;
const tag = isTestServer ? "b_test_" : "b_"; // 云信标识头

// 需要挂载的
export var nim = null;
export var nimInfo = {
  chatList: [],
  chatListGetDone: false,
  sessionInfo: {}, // 会话对象
  chatViewList: [],
  chatViewVM: null, // 聊天页面实例
};

// nim 云信实例
export const InitIM = async function (vue) {
  var that = vue;

  var userIdList = []; //  转化的云信id列表 tag + id
  var tempUidList = []; // 临时id列表 id

  // 解析参数
  var userInfo = GetMyUserInfo();

  // 获取云信参数
  var token = userInfo.wyToken;
  var account = tag + userInfo.id;
  var appKey = "590d2352a5d8778b6d1f427b5ecc8c62";

  // 实例初始化
  nim = NIM.getInstance({
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

    // 遍历会话 添加到id列表
    sessions.map((item) => {
      // 单独抽离id去请求每个会话的用户信息
      if (item.id.indexOf("b_") > 0) {
        let tempUid = item.id.slice(item.id.lastIndexOf("_") + 1);
        tempUidList.push(tempUid);
        userIdList.push(tag + tempUid); // 云信id转换
      }
    });
    console.log("====== 会话云信id列表 ======", userIdList);

    nim.getUsers({
      accounts: userIdList,
      sync: false,
      done: getUsersDone,
    });

    function getUsersDone(error, data) {
      data.reverse();
      console.log("====== 获取云信id列表的用户信息 ======", data);
      // 添加相关的用户信息
      for (var i = sessions.length - 1; i >= 0; i--) {
        for (var j = data.length - 1; j >= 0; j--) {
          if (sessions[i].id == "p2p-" + data[j].account) {
            sessions[i].targetUserInfo = data[j];
          }
        }
      }
      nimInfo.chatListGetDone = true;
      nimInfo.chatList = sessions;
      that.$forceUpdate();
    }
  }

  // 收到会话更新
  function onUpdateSession(session) {
    // 无论是发送或者接收都在这里更新列表
    if (session.lastMsg.status == "success") {
      console.log("====== 会话更新了 ======", session);
      // 更新当前会话
      ResetLastMsg(session);

      // 添加到viewList 强制刷新
      nimInfo.chatViewList.push(session.lastMsg);
      nimInfo.chatViewVM.$forceUpdate();

      console.log("当前nim信息", nimInfo);

      // 滚动条置顶
      nimInfo.chatViewVM.ResetScroll();
    }
  }

  // im收到消息
  function onMsg(msg) {
    console.log("====== im收到消息 ======", msg);

    // 添加未读
    AddUnread(msg.sessionId);

    // 自动设置该消息
    SetCurrentSession(msg, msg.sessionId);

    // 滚动到底部
    // that.$refs.chatView.ResetScroll();
  }

  // 收到自定义消息
  function onCustomSysMsg(sysMsg) {
    const content = JSON.parse(sysMsg.content);
    console.log("====== 收到自定义系统通知 ======", content);
  }
  //#endregion

  //#region 暂时不处理
  function onRoamingMsgs(obj) {
    console.log("====== im收到漫游消息 ======", obj);
  }
  function onOfflineMsgs(obj) {
    console.log("====== im收到离线消息 ======", obj);
  }
  function onConnect() {
    console.log("====== 云信sdk 进入IM ======");
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

// 时间戳转换
export function formatMsgTime(timespan) {
  var dateTime = new Date(timespan); // 将传进来的字符串或者毫秒转为标准时间
  var year = dateTime.getFullYear();
  var month = dateTime.getMonth() + 1;
  var day = dateTime.getDate();
  var hour = dateTime.getHours();
  var minute = dateTime.getMinutes();
  // var second = dateTime.getSeconds()
  var millisecond = dateTime.getTime(); // 将当前编辑的时间转换为毫秒
  var now = new Date(); // 获取本机当前的时间
  var nowNew = now.getTime(); // 将本机的时间转换为毫秒
  var milliseconds = 0;
  var timeSpanStr;
  milliseconds = nowNew - millisecond;
  if (milliseconds <= 1000 * 60 * 1) {
    // 小于一分钟展示为刚刚
    timeSpanStr = "Just now";
  } else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
    // 大于一分钟小于一小时展示为分钟
    timeSpanStr = Math.round(milliseconds / (1000 * 60)) + "min ago";
  } else if (
    1000 * 60 * 60 * 1 < milliseconds &&
    milliseconds <= 1000 * 60 * 60 * 24
  ) {
    // 大于一小时小于一天展示为小时
    timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + "h ago";
  } else if (
    1000 * 60 * 60 * 24 < milliseconds &&
    milliseconds <= 1000 * 60 * 60 * 24 * 15
  ) {
    // 大于一天小于十五天展示位天
    timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + "d ago";
  } else if (
    milliseconds > 1000 * 60 * 60 * 24 * 15 &&
    year === now.getFullYear()
  ) {
    timeSpanStr = month + "-" + day + " " + hour + ":" + minute;
  } else {
    timeSpanStr = year + "-" + month + "-" + day + " " + hour + ":" + minute;
  }
  return timeSpanStr;
}

//#endregion

//#region  通用方法

// 获取个人信息
function GetMyUserInfo() {
  console.log("我的信息", store.state.user.loginInfo.userInfo);
  return store.state.user.loginInfo.userInfo;
}

// 列表会话 查找当前会话是否存在
function GetSessionBySessionId(id) {
  for (var i = nimInfo.chatList.length - 1; i >= 0; i--) {
    if (nimInfo.chatList[i].id == id) {
      return true;
    }
  }
  return false;
}

// 云端查询人物信息 是否跳转
function GetSessionInfo(id, isPush) {
  nim.getUser({
    account: id,
    sync: false,
    done: getUsersDone,
  });
  function getUsersDone(error, data) {
    nimInfo.sessionInfo = data;
    GetHistoryAndPush(isPush);
  }
}

// 获取历史记录
function GetHistoryAndPush(isPush) {
  return GetRemoteHistoryAndPush(isPush);
}

// 修改左侧列表的上次消息
function ResetLastMsg(session) {
  nimInfo.chatList.map((item) => {
    if (item.id == session.id) {
      item.lastMsg = session.lastMsg;
    }
    return item;
  });
}

// 添加未读 当前id的消息未读加1
function AddUnread(id) {
  nimInfo.chatList.map((item) => {
    if (item.id == id) {
      item.unread++;
    }
    return item;
  });
}
// 清空当前id的消息未读
function ClearUnread(id) {
  nimInfo.chatList.map((item) => {
    if (item.id == id) {
      item.unread = 0;
    }
    return item;
  });
}

// 置顶当前会话
function SetCurrentSession(session, sessionId) {
  console.log("置顶会话", session);
  console.log("置顶之前的数组", nimInfo.chatList);
  if (GetSessionBySessionId(sessionId)) {
    console.log("当前会话存在", sessionId);
    var targetIndex = nimInfo.chatList.findIndex((x) => x.id == sessionId);

    nimInfo.chatList.map((item, i) => {
      if (targetIndex == i) {
        nimInfo.chatList.splice(i, 1);
        nimInfo.chatList.unshift(item);
      }
      return item;
    });
  } else {
    //TODO 待修复
    console.log("新会话", sessionId);
    // this.chatList.unshift(session);
    // //TODO 索引加加
    // this.$refs.chatlist.IndexAdd();
  }

  console.log("置顶之后的数组", nimInfo.chatList);
}
//#endregion

//#region  可变方法

// 添加在线信息
async function AddOnlineInfo() {
  var res = await api.onlineInfo({ userIDList: tempUidList.join(",") });
  if (!res.result) return; // that.$message.error("获取在线信息失败")
  console.log("获取到了云信id列表的在线信息", res);
  for (var i = 0; i < chatList.length; i++) {
    for (var j = 0; j < res.data.onlineStatusList.length; j++) {
      if (
        chatList[i].id.slice(chatList[i].id.lastIndexOf("_") + 1) ==
        res.data.onlineStatusList[j].userID
      ) {
        chatList[i].targetUserInfo.onlineInfo = res.data.onlineStatusList[j];
      }
    }
  }
}
// 获取本地历史记录
function GetLocalHistoryAndPush(isPush) {
  var sessionId = nimInfo.sessionInfo.id;
  nim.getLocalMsgs({
    sessionId,
    limit: 100,
    done: getLocalMsgsDone,
  });
  function getLocalMsgsDone(error, obj) {
    console.log("获取本地消息" + (!error ? "成功" : "失败"), error, obj);
    console.log("获取到了与id为" + sessionId + "的历史信息");
    nimInfo.chatViewList = obj.msgs.reverse();
    if (isPush) router.push({ path: "/chatInfo" });
  }
}
// 获取远端历史记录并跳转
function GetRemoteHistoryAndPush(isPush) {
  var account = nimInfo.sessionInfo.account;
  console.log("远端历史记录to", account);
  nim.getHistoryMsgs({
    debug: true,
    scene: "p2p",
    to: account, // 这里和发的一样
    done: getRemoteHistoryMsgsDone,
  });
  function getRemoteHistoryMsgsDone(error, obj) {
    console.log("获取远端消息" + (!error ? "成功" : "失败"), error, obj);
    console.log("获取到了与id为" + account + "的历史信息");
    nimInfo.chatViewList = obj.msgs.reverse();
    if (isPush) router.push({ path: "/chatInfo" });
  }
}
//#endregion

//#region  外部回调

// 根据id信息跳转会话页面
export const GoToChatView = (id) => {
  nim.resetSessionUnread(id); //  清除未读
  GetSessionInfo(id, true); // 获取会话对象信息并跳转
};

// 断开连接
export const DisConnectNim = () => {
  if (nim == null) return;
  nim.disconnect();
  nim.destroy();

  nimInfo = {
    chatList: [],
    chatListGetDone: false,
    sessionInfo: {},
    chatViewList: [],
  };
};

// 发送消息回调 (远端)
export const SendText = (vue, msg) => {
  // 效验
  // if (msg == "" && that.imFile.imageFile.length == 0) {
  //     that.$message.error("回复信息不能为空！");
  //     return false;
  // } else if (msg.length > 500) {
  //     that.$message.error("回复信息不能超过500！");
  //     return false;
  // }

  var lastMsg = null;
  var id = "p2p-" + nimInfo.sessionInfo.account;
  // 文本消息发送
  if (msg != "") {
    var msg = nim.sendText({
      scene: "p2p",
      to: nimInfo.sessionInfo.account,
      // to: "b_test_182",
      text: msg,
      done: sendMsgDone,
    });
    function sendMsgDone(error, msg) {
      if (error) {
        console.log(error);
      } else {
        // 获取当前最后一条消息记录
        for (var i = 0; i < nimInfo.chatList.length; i++) {
          if (nimInfo.chatList[i].id == id) {
            lastMsg = nimInfo.chatList[i].lastMsg;
          }
        }
        // 发送消息已读回执
        nim.sendMsgReceipt({
          msg: lastMsg,
          done: sendMsgReceiptDone,
        });
        function sendMsgReceiptDone(error, obj) {
          console.log("发送Text给" + nimInfo.sessionInfo.nick);
        }
      }
    }
  }

  // 图片消息发送
  // if (that.imFile.imageFile.length > 0) {
  //     that.imFile.imageFile.map((item) => {
  //         // that.isSendImg = true;
  //         nim.previewFile({
  //             type: "image",
  //             blob: item.raw,
  //             uploadprogress: function (obj) {
  //                 console.log("文件总大小: " + obj.total + "bytes");
  //                 console.log("已经上传的大小: " + obj.loaded + "bytes");
  //                 console.log("上传进度: " + obj.percentage);
  //                 console.log("上传进度文本: " + obj.percentageText);
  //             },
  //             done: function (error, file) {
  //                 console.log("上传image" + (!error ? "成功" : "失败"));
  //                 // show file to the user
  //                 if (!error) {
  //                     var msg = that.nim.sendFile({
  //                         scene: "p2p",
  //                         to: that.sessionInfo.account,
  //                         file: file,
  //                         done: sendMsgDone,
  //                     });
  //                     console.log("正在发送p2p image消息, id=" + msg.idClient);
  //                     function sendMsgDone(error, msg) {
  //                         that.isSendImg = false;
  //                         if (error) {
  //                             that.$message.error("图片发送失败");
  //                             console.log(error);
  //                         } else {
  //                             that.imFile.imageFile = [];

  //                             that.nim.sendMsgReceipt({
  //                                 msg: that.GetByChatList("p2p-" + that.sessionInfo.account)
  //                                     .lastMsg,
  //                                 done: sendMsgReceiptDone,
  //                             });
  //                             function sendMsgReceiptDone(error, obj) {
  //                                 console.log("发送Img给" + that.sessionInfo.nick);
  //                             }
  //                         }
  //                     }
  //                 }
  //             },
  //         });
  //     });
  // }

  // 置顶当前会话

  SetCurrentSession(nimInfo.sessionInfo, nimInfo.sessionInfo.id);

  // 清除未读
  ClearUnread(nimInfo.sessionInfo.id);
};
// 记录聊天页面实例
export const RecordVm = (vue) => {
  nimInfo.chatViewVM = vue;
};

//#endregion
