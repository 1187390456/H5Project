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
      <div class="flex-col-center-start">
        <div v-if="isBlogger" class="content font-16-400-000000-22">
          <div style="padding: 12px">
            You can earn cash by replying to messages !
          </div>
        </div>
        <div v-if="isBlogger" class="card flex-col-sbt-center">
          <div class="c1 font-14-400-ffffff-20">Total Revenue（$）</div>
          <div class="c2 flex-center-sbt">
            <span class="font-28-500-ffffff-40">{{
              (parseInt(dataInfo.totalMoney * 100) / 100).toFixed(2)
            }}</span>
            <el-button
              class="btnStyle flex-center-center font-14-500-ff4471-20"
              @click="Withdrawal"
              >Withdrawals</el-button
            >
          </div>
          <div class="cardline"></div>
          <div class="c3 flex-center-sbt">
            <div class="font-14-400-ffffff-20">Number of replied messages</div>
            <div class="font-14-500-ffffff-20">{{ dataInfo.replyCount }}</div>
          </div>
          <div class="cardline"></div>
          <div class="c4 flex-center-sbt">
            <div class="font-14-400-ffffff-20">Revenue per message</div>
            <div class="font-14-500-ffffff-20">
              ${{ (parseInt(dataInfo.moneyUnit * 100) / 100).toFixed(2) }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 边界 -->
    <div class="sildeRight"></div>
    <!-- 右侧 -->
    <chat-view
      :chatViewList="chatViewList"
      :sessionInfo="sessionInfo"
      @SendText="SendText"
      ref="chatView"
    ></chat-view>
    <!-- 对话框 -->
    <div class="dialong" v-if="WithdrawalsDialong">
      <!-- 遮罩 -->
      <div class="mask"></div>
      <!-- 对话框 -->
      <div class="dialongContent flex-col-center-center">
        <div
          class="font-16-500-000000-22"
          style="padding: 0px 26px 17px 27px; text-align: center"
        >
          Please contact the operating personnel to help you complete the
          withdrawal
        </div>
        <button
          class="drawBtn font-16-400-ffffff-22"
          style="padding: 0px 26px 0px 25px; cursor: pointer"
          @click="() => (WithdrawalsDialong = false)"
        >
          OK
        </button>
      </div>
    </div>
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

      serverTag: "h_test_",

      WithdrawalsDialong: false,

      isSwitch: false,
    };
  },

  created() {
    this.ListenSwitch();
    this.Init();
  },
  destroyed() {
    if (this.nim == null) return;
    this.DisconnectIM();
  },

  methods: {
    // 切换监听
    ListenSwitch() {
      var type = getUrlKey("type");
      var u = getUrlKey("u");
      var n = getUrlKey("n");

      var switchInfo = {
        type,
        u,
        n,
      };

      var localSwitchInfo = JSON.parse(localStorage.getItem("switchInfo"));

      // 首次进入
      if (localSwitchInfo == null) {
        localStorage.setItem("switchInfo", JSON.stringify(switchInfo));
        this.isSwitch = false;
      } else {
        console.log("链接", switchInfo);
        console.log("本地", localSwitchInfo);

        // 未切换
        if (
          localSwitchInfo.type == switchInfo.type &&
          localSwitchInfo.u == switchInfo.u &&
          localSwitchInfo.n == switchInfo.n
        ) {
          this.isSwitch = false;
        } else {
          // 切换了
          localStorage.setItem("switchInfo", JSON.stringify(switchInfo));
          this.isSwitch = true;
        }
      }
      console.log("切换链接了吗?", this.isSwitch);

      if (this.isSwitch) {
        localStorage.setItem("localData", null);
      }
    },
    // 初始数据
    async Init() {
      var u = getUrlKey("u");
      var n = getUrlKey("n");
      var res = await userInfo({ userID: u, nickname: n });
      if (!res.result) return; // this.$message.error("后台错误!")
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
      this.RefreshRead(); // 数据刷新后再刷已读
    },
    destroyed() {
      if (this.nim != null) {
        this.DisconnectIM();
      }
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

      localStorage.setItem("localData", null);
    },
    // 发送消息
    SendText(msg) {
      console.log("发送的消息为");
      console.log(msg);

      if (msg == "")
        return this.$message.error("The message cannot be empty !");

      var that = this;
      console.log(
        "发送给id为" + that.sessionInfo.id + "的用户" + "消息为" + msg
      );
      that.nim.sendText({
        scene: "p2p",
        to: that.serverTag + that.sessionInfo.id,
        text: msg,
        done: sendMsgDone,
      });
      function sendMsgDone(error, msg) {
        console.log("发送消息");
        console.log(!error ? "成功" : "失败");

        // 延时请求
        setTimeout(() => {
          // 刷新已读和金币 重置滚动条

          that.RefreshData();
          that.$refs.chatView.ResetScroll();
        }, 600);

        // if (!error) {
        //   that.nim.sendMsgReceipt({
        //     msg: that.curSession.lastMsg,
        //     done: sendMsgReceiptDone,
        //   });
        //   function sendMsgReceiptDone(error, obj) {
        //     console.log("发送消息已读回执");
        //     console.log(!error ? "成功" : "失败");
        //     console.log(obj);
        //   }
        // }
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
        var localData = JSON.parse(localStorage.getItem("localData"));
        console.log("localData", localData);
        that.chatViewList = localData == null ? obj.msgs.reverse() : localData;
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
        item.isUnreadable = true;
        return item;
      });
    },
    // 体现
    Withdrawal() {
      this.WithdrawalsDialong = true;
    },
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

.slide {
  width: 295px;
  height: 100vh;
  background: #ffffff;
  margin-top: 16px;
  .userInfo {
    img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      margin-left: 5px;
    }
    margin: 0 0 16px 16px;
  }
  .content {
    width: 258px;
    height: 68px;
    background-color: rgba(92, 92, 92, 0.1);
    border-radius: 10px;
  }
  .card {
    width: 258px;
    height: 188px;
    border-radius: 24px;

    margin-top: 16px;

    background: url("../assets/images/m2.png");

    .cardline {
      width: 100%;
      height: 1px;
      background: #ffffff;
      opacity: 0.1;
    }
    .c1 {
      padding: 16px 0 0 16px;
    }
    .c2 {
      padding: 8px 16px 14px 16px;
    }

    .c3 {
      padding: 12px 16px;
    }

    .c4 {
      padding: 12px 16px;
    }
  }
}
.sildeRight {
  position: fixed;
  top: 0;
  left: 295px;

  width: 5px;
  height: 100vh;
  background: #d8d8d8;
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