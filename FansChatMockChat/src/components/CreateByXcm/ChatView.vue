<template>
  <div class="chatView">
    <div class="top flex-center-start">
      <div class="l">
        <img class="imgStyle" :src="sessionInfo.avatar" alt="" />
      </div>
      <span class="font-14-500-161616">{{ sessionInfo.nickname }}</span>
    </div>
    <div class="line1"></div>
    <div class="center" ref="chatViewRef">
      <time-line
        v-if="chatViewList.length > 0"
        :timeInfo="chatViewList[0].time"
      ></time-line>
      <div
        :class="[
          'w100p',
          item.from == 'h_test_' + sessionInfo.id
            ? 'flex-col-start-center'
            : 'flex-col-end-center',
        ]"
        v-for="(item, i) in chatViewList"
        :key="i"
      >
        <text-msg
          :info="item"
          :sessionInfo="sessionInfo"
          :isleft="item.from == 'h_test_' + sessionInfo.id"
        ></text-msg>
      </div>
    </div>
    <div class="bottom">
      <div class="line2"></div>
      <el-input
        style="margin-top: 8px"
        type="textarea"
        :rows="6"
        placeholder="Please enter a message !"
        v-model="textarea"
        @keydown.native="listen($event)"
      >
      </el-input>
      <el-button
        class="b font-14-500-ffffff flex-center-center"
        @click="SendText"
        >Send</el-button
      >
    </div>
  </div>
</template>

<script>
import TextMsg from "./MsgType/TextMsg.vue";
import TimeLine from "./MsgType/TimeLine.vue";

export default {
  props: {
    chatViewList: {
      default: [],
      type: Array,
    },
    sessionInfo: {
      default: {},
      type: Object,
    },
  },
  components: { TextMsg, TimeLine },
  data() {
    return {
      textarea: "",
    };
  },
  mounted() {
    this.ResetScroll();
  },
  methods: {
    listen(event) {
      if (event.keyCode == 13 && event.ctrlKey) {
        this.textarea += "\n"; //换行
      } else if (event.keyCode === 13) {
        this.SendText(); // 发送文本
        event.preventDefault(); // 阻止浏览器默认换行操作
        return;
      }
    },
    SendText() {
      this.$emit("SendText", this.textarea);
      this.ResetScroll();
      this.textarea = "";
    },
    Reset() {
      this.ResetScroll();
    },
    ResetScroll() {
      var that = this;
      // 滚动条自适应
      this.$nextTick(() => {
        var root = that.$refs["chatViewRef"];
        setTimeout(() => {
          root.scrollTop = root.scrollHeight;
        }, 200);
      });
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .el-textarea__inner {
  border: none;
  background: #f6f7fb;

  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  line-height: 20px;
}

::-webkit-scrollbar {
  width: 0px;
}
.emj_img_btn {
  position: fixed;
  background: #f6f7fb;
  border: none;

  width: 24px;
  height: 24px;

  display: flex;
  align-items: center;
  justify-content: center;
}
.chatView {
  position: fixed;
  top: 0;
  left: 330px;
  width: calc(100% - 330px);
  height: 100%;

  background: #f6f7fb;

  .top {
    width: 100%;
    padding: 12px 0 12px 11px;

    .l {
      width: 30px;
      height: 30px;
      margin-right: 8px;
      position: relative;

      .float {
        position: absolute;
        bottom: 0;
        left: 19px;
        width: 7.5px;
        height: 7.5px;
        background: #4cc81e;
        border: 2px solid #ffffff;
        border-radius: 50%;
      }
    }
  }
  .line1 {
    position: absolute;
    width: 100%;
    height: 1px;
    opacity: 0.5;
    background-color: #9a9a9a;
  }
  .center {
    position: fixed;
    top: 60px;
    width: calc(100% - 330px);
    max-height: calc(
      100% - 182px - 110px - 8px + 45px
    ); // 当前屏幕高度 - 上面的 - 下面的 - 边距
    overflow: scroll;
    overflow-x: hidden;
  }

  .bottom {
    position: fixed;
    bottom: 0;
    width: calc(100% - 325px);
    height: 182px;
    .line2 {
      position: absolute;
      width: 100%;
      height: 1px;
      opacity: 0.5;
      background-color: #9a9a9a;
    }
    .b {
      position: absolute;
      bottom: 8px;
      right: 8px;

      width: 60px;
      height: 32px;
      background: #8135ff;
      border-radius: 5px;
      color: #ffffff !important;
    }
  }
}
</style>