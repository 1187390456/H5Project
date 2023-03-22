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
        style="margin-top: 30px"
        type="textarea"
        :rows="2"
        placeholder="请输入消息"
        v-model="textarea"
      >
      </el-input>
      <el-button
        :disabled="isSendImg"
        class="b font-14-500-ffffff flex-center-center"
        @click="OnClick"
        >发送</el-button
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
    fileImageWidth: {
      default: 400,
      type: Number,
    },
    isSendImg: {
      default: false,
      type: Boolean,
    },
  },
  components: { TextMsg, TimeLine },
  data() {
    return {
      textarea: "",

      dialogVisible: false,
      dialogImageUrl: "",
    };
  },
  mounted() {
    this.ResetScroll();
  },
  methods: {
    OnClick() {
      if (this.isSendImg) return;
      this.$emit("SendText", this.textarea);
      this.ResetScroll();
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

    //图片上传限制钩子
    handleImageExceed() {
      this.$message.warning("最多可上传1张图片");
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .el-textarea__inner {
  border: none;
  background: #f6f7fb;
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
  left: 325px;
  width: calc(100% - 325px);
  height: 100%;

  background: #f6f7fb;

  .top {
    width: 100%;
    padding: 12px 0 12px 11px;

    .l {
      width: 25px;
      height: 25px;
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
    top: 50px;
    width: 100%;
    opacity: 0.5;
    border: 1px solid #9a9a9a;
  }
  .center {
    position: fixed;
    top: 60px;
    width: calc(100% - 325px);
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
      top: -1px;

      width: 100%;
      opacity: 0.5;
      border: 1px solid #9a9a9a;
    }
    .b {
      position: absolute;
      bottom: 28px;
      right: 24px;

      width: 60px;
      height: 32px;
      background: #8135ff;
      border-radius: 5px;
      color: #ffffff !important;
    }
  }
}
</style>