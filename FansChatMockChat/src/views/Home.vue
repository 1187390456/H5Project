<template>
  <div class="flex-center-start" v-if="sessionInfo && sessionInfo.id != null">
    <!-- 左侧 -->
    <div class="slide">
      <div class="userInfo flex-center-start">
        <img :src="sessionInfo.avatar" alt="" />
        <span style="margin-left: 8px" class="font-18-500-3c3647">{{
          sessionInfo.nickname
        }}</span>
      </div>
      <div class="content font-16-400-000000">
        你可以通过回复对方消息来获取现金收益
      </div>
      <div class="card flex-col-sbt-center">
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
    };
  },

  created() {
    this.Init();
  },
  mounted() {
    ReSetIM(this);
  },
  destroyed() {
    if (this.nim == null) return;
    this.DisconnectIM();
  },

  methods: {
    // 初始数据
    async Init() {
      var res = await userInfo({ userID: 1, nickname: "123123" });
      if (!res.result) return this.$message.error("后台错误!");
      this.dataInfo = res.data;

      sessionStorage.setItem("operateInfo", JSON.stringify(res.data.operator));
      sessionStorage.setItem("bloggerInfo", JSON.stringify(res.data.blogger));
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
        console.log(error);
        console.log("发送消息" + error ? "成功" : "失败");
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
        console.log("更新右侧");
        console.log(that.chatViewList);

        that.$refs.chatView.ResetScroll(); // 重置滚动条
      }
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
      width: 16px;
      height: 16px;
      border-radius: 50%;
      margin-left: 5px;
    }
  }
  .content {
    background: #ccc;
    border-radius: 10px;
    display: flex;
    align-items: center;
    padding: 12px;
    margin: 15px 0;
    line-height: 22px;
  }
  .card {
    height: 188px;
    border-radius: 10%;
    padding: 20px;
    padding-bottom: 5px;
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