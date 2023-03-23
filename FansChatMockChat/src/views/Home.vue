<template>
  <div class="flex-center-start" v-if="sessionInfo && sessionInfo.id != null">
    <!-- 左侧 -->
    <div class="slide">
      <div class="userInfo flex-center-start">
        <img :src="selfInfo.avatar" alt="" />
        <span style="margin-left: 8px" class="font-18-500-3c3647-25">{{
          selfInfo.nickname
        }}</span>
      </div>
      <div v-if="isBlogger" class="content font-16-400-000000">
        你可以通过回复对方消息来获取现金收益
      </div>
      <div v-if="isBlogger" class="card flex-col-sbt-evenly">
        <div class="font-14-400-ffffff-20">总收益（$）</div>
        <div class="c2 flex-center-sbt">
          <span class="font-28-500-ffffff-40">{{ dataInfo.totalMoney }}</span>
          <el-button class="btnStyle flex-center-center font-14-500-ff4471-20"
            >提现</el-button
          >
        </div>
        <div class="c3 flex-center-sbt">
          <div class="font-14-400-ffffff-20">已回复消息（条）</div>
          <div class="font-14-500-ffffff-20">{{ dataInfo.replyCount }}</div>
        </div>
        <div class="c4 flex-center-sbt">
          <div class="font-14-400-ffffff-20">每条消息收益</div>
          <div class="font-14-500-ffffff-20">${{ dataInfo.moneyUnit }}</div>
        </div>
      </div>
    </div>
    <!-- 右侧 -->
    <chat-view
      :chatViewList="chatViewList"
      :sessionInfo="sessionInfo"
      @SendText="SendText"
      ref="chatView"
    ></chat-view>
  </div>
</template>

<script>
import { getUrlKey } from "../utils/tools";
import { userInfo } from "../../api/xcm";
import { ReSetIM } from "../utils/xcm";
import ChatView from "../components/CreateByXcm/ChatView.vue";
export default {
  components: { ChatView },
  data() {
    return {
      dataInfo: {}, // 初始请求的运营和妹子信息

      nim: null, // 云信实例
      sessionInfo: {}, // 别人
      selfInfo: {}, // 自己
      chatViewList: [], // 视图列表

      curSession: {}, // 当前会话

      isBlogger: false, // 我自己的身份是博主吗
    };
  },

  created() {
    this.Init();
    this.dataInfo = this.$store.state.test.dataInfo;
  },
  destroyed() {
    if (this.nim == null) return;
    this.DisconnectIM();
  },

  methods: {
    // 初始数据
    async Init() {
      var u = getUrlKey("u");
      var n = getUrlKey("n");
      var res = await userInfo({ userID: u, nickname: n });
      if (!res.result) return this.$message.error("后台错误!");
      this.dataInfo = res.data;

      var operateInfo = res.data.operator;
      var bloggerInfo = res.data.blogger;

      this.isBlogger = getUrlKey("type") == 1 ? false : true;

      this.selfInfo = this.isBlogger ? bloggerInfo : operateInfo;
      this.sessionInfo =
        this.selfInfo == bloggerInfo ? operateInfo : bloggerInfo;

      sessionStorage.setItem("dataInfo", JSON.stringify(res.data));

      sessionStorage.setItem(
        "bloggerId",
        this.isBlogger ? this.selfInfo.id : this.sessionInfo.id
      );

      sessionStorage.setItem("isBlogger", this.isBlogger);

      console.log("我自己的身份是博主吗" + this.isBlogger);
      console.log("我自己的信息");
      console.log(this.selfInfo);
      console.log("聊天人的信息");
      console.log(this.sessionInfo);

      ReSetIM({
        vue: this,
        selfInfo: this.selfInfo,
        sessionInfo: this.sessionInfo,
      });
    },
    // 刷新数据
    async RefreshData() {
      var u = getUrlKey("u");
      var n = getUrlKey("n");
      var res = await userInfo({ userID: u, nickname: n });
      if (!res.result) return this.$message.error("后台错误!");
      this.dataInfo = res.data;
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
    // 发送消息
    SendText(msg) {
      var that = this;
      console.log(
        "发送给id为" + that.sessionInfo.id + "的用户" + "消息为" + msg
      );
      that.nim.sendText({
        scene: "p2p",
        to: "h_test_" + that.sessionInfo.id,
        text: msg,
        done: sendMsgDone,
      });
      function sendMsgDone(error, msg) {
        console.log("发送消息");
        console.log(!error ? "成功" : "失败");

        // 刷新已读和金币 重置滚动条
        that.RefreshRead();
        that.RefreshData();
        that.$refs.chatView.ResetScroll();

        if (!error) {
          that.nim.sendMsgReceipt({
            msg: that.curSession.lastMsg,
            done: sendMsgReceiptDone,
          });
          function sendMsgReceiptDone(error, obj) {
            console.log("发送消息已读回执");
            console.log(!error ? "成功" : "失败");
            console.log(obj);
          }
        }
      }
    },
    // 获取历史消息记录
    GetHistory(sessionId) {
      var that = this;

      that.nim.getLocalMsgs({
        sessionId,
        limit: 100,
        done: getLocalMsgsDone,
      });

      function getLocalMsgsDone(error, obj) {
        console.log("获取本地消息" + (!error ? "成功" : "失败"), error, obj);
        that.chatViewList = obj.msgs.reverse();
        console.log("获取到了与" + sessionId + "的历史信息");
        console.log("更新右侧1");
        console.log(that.chatViewList);
        ResetUnread();

        that.$refs.chatView.ResetScroll(); // 重置滚动条
      }

      function ResetUnread() {
        that.chatViewList.map((item) => {
          item.isReadMsg = true;
          return item;
        });

        console.log("更新右侧2");
        console.log(that.chatViewList);
      }

      this.Init();
    },
    // 刷新已读
    RefreshRead() {
      this.chatViewList.map((item) => {
        item.isUnreadable = false;
        return item;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.btnStyle {
  width: 60px;
  height: 32px;
  background: #ffffff;
  border-radius: 5px;
  border: none;
}

.slide {
  width: 295px;
  height: 100vh;
  background: #ffffff;
  padding: 21px 16px;
  .userInfo {
    img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      margin-left: 5px;
    }
  }
  .content {
    height: 68px;
    background: #ccc;
    border-radius: 10px;
    display: flex;
    align-items: center;
    padding: 12px;
    margin: 15px 0;
    line-height: 22px;
  }
  .card {
    height: 258px;
    border-radius: 10%;
    padding: 0 20px;
    background: url("../assets/images/m2.png");

    .c2 {
      padding: 8px 0 14px 0;
      border-bottom: 1px solid #ffffff;
    }

    .c3 {
      padding: 12px 0;
      border-bottom: 1px solid #ffffff;
    }
    .c4 {
      padding: 12px 0;
    }
  }
}
</style>