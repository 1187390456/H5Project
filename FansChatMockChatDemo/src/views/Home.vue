<template>
  <div style="display: flex">
    <chat-list :chatList="chatList" v-if="chatListGetDone && viewType == 'list'" @SelectChatCallback="SelectChatCallback"
      ref="chatlist"></chat-list>
    <chat-view :chatViewList="chatViewList" :sessionInfo="sessionInfo" :fileImageWidth="fileImageWidth"
      :isSendImg="isSendImg" v-if="chatViewList.length > 0 && viewType == 'view'" @SendText="SendText"
      @handleImageChange="handleImageChange" @handleImageRemove="handleImageRemove" @ReturnList="ReturnList"
      ref="chatView"></chat-view>
  </div>
</template>

<script>
import { getUrlKey } from "../utils/tools";
import { userInfo } from "../../api/xcm";

import ChatList from "../components/CreateByXcm/ChatList.vue";
import ChatView from "../components/CreateByXcm/ChatView.vue";
import { ReSetIM } from "../utils/xcm";

export default {
  components: { ChatList, ChatView },
  data() {
    return {
      nim: null, // 云信实例
      userIdList: [], // 转化的云信id列表
      chatList: [], // 左侧消息列表
      chatListGetDone: false, // 获取完毕时机
      chatViewList: [], // 右侧视图列表
      sessionInfo: {}, // 选择左侧item的用户信息
      selectChatItem: {}, // 选择左侧item

      imFile: { imageFile: [] }, // 添加的临时图片
      isSendImg: false, // 是否正在上传图片
      fileImageWidth: 400, //图片上传提示框宽度

      viewType: 'list'
    };
  },
  created() {
    this.Init();
    this.ListenWindowRoot(); // 窗口监听
  },
  destroy() {
    if (this.nim == null) return;
    this.DisconnectIM();
  },
  destroyed() {
    if (this.nim == null) return;
    this.DisconnectIM();
  },

  methods: {
    // 窗口监听
    ListenWindowRoot() {
      window.addEventListener("load", () => this.Adaptive());
      window.onresize = () => this.Adaptive();
    },
    // 自适应
    Adaptive() {
      let html = document.documentElement;
      let rootFont = document.body.clientWidth;

      html.style.fontSize = "20px";

      if (rootFont < 768) {
        console.log(rootFont);
        html.style.fontSize = `${rootFont / 20}px`;
        console.log(html.style.fontSize, "手机端");
        this.isMobile = true;
      } else {
        html.style.fontSize = "20px";
        console.log(html.style.fontSize, "PC端1");
        this.isMobile = false;
      }
    },
    // 初始数据
    async Init() {
      var u = getUrlKey("u");
      var n = getUrlKey("n");
      var res = await userInfo({ userID: u, nickname: n });
      if (!res.result) return; // this.$message.error("后台错误!")
      console.log('请求信息', res.data);
      this.dataInfo = res.data; // TODO暂时只用博主
      ReSetIM(this);
    },
    // 加载遮罩
    LoadingMask() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      setTimeout(() => {
        loading.close();
      }, 1000);
    },
    // 选中会话回调
    SelectChatCallback(selectItem) {
      this.selectChatItem = selectItem;
      console.log(selectItem);
      console.log("选中了" + selectItem.targetUserInfo.nick);

      this.chatViewList = [];

      this.nim.resetSessionUnread(selectItem.id); // 清除未读
      this.sessionInfo = this.GetInfoByChatList(selectItem.id); // 获取会话对象信息
      this.GetHistory(selectItem.id); // 获取历史消息

      this.viewType = "view"
    },
    // 断开云信连接
    DisconnectIM() {
      this.nim.disconnect();
      this.nim.destroy();

      this.userIdList = [];
      this.chatList = [];
      this.chatListGetDone = false;
      this.chatViewList = [];
      this.sessionInfo = null;
    },
    // 发送消息回调
    SendText(msg) {
      var that = this;

      // 效验
      if (msg == "" && that.imFile.imageFile.length == 0) {
        that.$message.error("回复信息不能为空！");
        return false;
      } else if (msg.length > 500) {
        that.$message.error("回复信息不能超过500！");
        return false;
      }

      // 文本消息发送
      if (msg != "") {
        var msg = that.nim.sendText({
          scene: "p2p",
          to: that.sessionInfo.account,
          text: msg,
          done: sendMsgDone,
        });
        function sendMsgDone(error, msg) {
          if (error) {
            console.log(error);
          } else {
            msg = "";
            if (!that.imFile.imageFile.length) {
              that.nim.sendMsgReceipt({
                msg: that.GetByChatList("p2p-" + that.sessionInfo.account)
                  .lastMsg,
                done: sendMsgReceiptDone,
              });
              function sendMsgReceiptDone(error, obj) {
                console.log("发送Text给" + that.sessionInfo.nick);
              }
            }
          }
        }
      }

      // 图片消息发送
      if (that.imFile.imageFile.length > 0) {
        that.imFile.imageFile.map((item) => {
          that.isSendImg = true;
          that.nim.previewFile({
            type: "image",
            blob: item.raw,
            uploadprogress: function (obj) {
              console.log("文件总大小: " + obj.total + "bytes");
              console.log("已经上传的大小: " + obj.loaded + "bytes");
              console.log("上传进度: " + obj.percentage);
              console.log("上传进度文本: " + obj.percentageText);
            },
            done: function (error, file) {
              console.log("上传image" + (!error ? "成功" : "失败"));
              // show file to the user
              if (!error) {
                var msg = that.nim.sendFile({
                  scene: "p2p",
                  to: that.sessionInfo.account,
                  file: file,
                  done: sendMsgDone,
                });
                console.log("正在发送p2p image消息, id=" + msg.idClient);
                function sendMsgDone(error, msg) {
                  that.isSendImg = false;
                  if (error) {
                    that.$message.error("图片发送失败");
                    console.log(error);
                  } else {
                    that.imFile.imageFile = [];

                    that.nim.sendMsgReceipt({
                      msg: that.GetByChatList("p2p-" + that.sessionInfo.account)
                        .lastMsg,
                      done: sendMsgReceiptDone,
                    });
                    function sendMsgReceiptDone(error, obj) {
                      console.log("发送Img给" + that.sessionInfo.nick);
                    }
                  }
                }
              }
            },
          });
        });
      }

      // 置顶当前会话
      this.SetCurrentSession(this.selectChatItem, this.selectChatItem.id);

      // 清除未读
      this.ClearUnread(this.selectChatItem.id);
    },
    // 置顶当前会话
    SetCurrentSession(session, sessionId) {
      console.log("置顶会话", session);

      console.log("置顶之前的数组", this.chatList);

      if (this.GetSessionBySessionId(sessionId)) {
        console.log("当前会话存在", sessionId);

        var targetIndex = this.chatList.findIndex((x) => x.id == sessionId);

        this.chatList.map((item, i) => {
          if (targetIndex == i) {
            this.chatList.splice(i, 1);
            this.chatList.unshift(item);
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

      console.log("置顶之后的数组", this.chatList);
    },
    // 当前id的消息未读加1
    AddUnread(id) {
      this.chatList.map((item) => {
        if (item.id == id) {
          console.log("找到了", item);
          item.unread++;
        }
        return item;
      });
    },
    // 清空当前id的消息未读
    ClearUnread(id) {
      this.chatList.map((item) => {
        if (item.id == id) {
          console.log("找到了", item);
          item.unread = 0;
        }
        return item;
      });
    },
    // 获取历史消息记录
    GetHistory(sessionId) {
      var that = this;
      that.nim.getHistoryMsgs({
        scene: 'p2p',
        to: that.sessionInfo.account, // 这里和发的一样
        done: getHistoryMsgsDone,
      });

      function getHistoryMsgsDone(error, obj) {
        console.log("获取云端消息" + (!error ? "成功" : "失败"), error, obj);
        console.log(
          "获取到了" + that.selectChatItem.targetUserInfo.nick + "的历史信息"
        );
        that.chatViewList = obj.msgs.reverse();

        console.log("当前更新的左侧列表");
        console.log(that.chatList);
        console.log("当前选中的左侧列表");
        console.log(that.selectChatItem);
        console.log("当前更新的右侧内容");
        console.log(that.chatViewList);
      }
    },
    // 从左侧列表 查找指定用户
    GetByChatList(id) {
      for (var i = 0; i < this.chatList.length; i++) {
        if (this.chatList[i].id == id) return this.chatList[i];
      }
      return null;
    },
    // 从左侧列表 查找指定id的用户信息
    GetInfoByChatList(id) {
      for (var i = 0; i < this.chatList.length; i++) {
        if (this.chatList[i].id == id) return this.chatList[i].targetUserInfo;
      }
      return null;
    },
    // 从左侧列表 查找当前会话是否存在
    GetSessionBySessionId(id) {
      for (var i = this.chatList.length - 1; i >= 0; i--) {
        if (this.chatList[i].id == id) {
          return true;
        }
      }
      return false;
    },
    // 修改左侧列表的上次消息
    ResetLastMsg(session) {
      this.chatList.map((item) => {
        if (item.id == session.id) {
          item.lastMsg = session.lastMsg;
        }
        return item;
      });
    },
    //添加图片文件
    handleImageChange(file, fileList) {
      this.imFile.imageFile = fileList;
      this.fileImageWidth = fileList.length * 160 + 300;
    },
    //删除图片文件
    handleImageRemove(file, fileList) {
      this.imFile.imageFile = fileList; //删除文件时要移除缓存区文件
    },
    // 返回列表视图
    ReturnList() {
      this.viewType = 'list'
    }
  },
};
</script>

<style lang="less" scoped>
.btnStyle {
  height: 32px;
  background: #ffffff;
  border-radius: 5px;
  border: none;
  color: #ff4471 !important;
}


.dialong {
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #000000;
    opacity: 0.34;
  }

  .dialongContent {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    // width: 350px;
    // height: 210px;

    width: 280px;
    height: 168px;

    background: #fefefe;
    border-radius: 16px;

    .drawBtn {
      width: 229px;
      height: 43px;
      background: #ff536c;
      border-radius: 29px;
      border: none;
    }
  }
}
</style>