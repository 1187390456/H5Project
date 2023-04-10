<template>
  <div class="fixPos">
    <div class="chatView">
      <div class="top flex-center-start">
        <div class="l">
          <img class="imgStyle" :src="sessionInfo.avatar" alt="" />
          <div v-if="sessionInfo.onlineInfo.isOnline" class="float"></div>
        </div>
        <span class="font-14-500-161616">{{ sessionInfo.nick }}</span>
        <el-button class="return font-14-500-ffffff flex-center-center" @click="$emit('ReturnList')">返回</el-button>
      </div>
      <div class="line1"></div>
      <div class="center" ref="chatViewRef">
        <time-line v-if="chatViewList.length > 0" :timeInfo="chatViewList[0].time"></time-line>
        <div :class="[
          'w100p',
          item.from == sessionInfo.account
            ? 'flex-col-start-center'
            : 'flex-col-end-center',
        ]" v-for="(item, i) in chatViewList" :key="i">
          <img-msg v-if="item.file != null" :info="item"></img-msg>

          <text-msg v-else :info="item" :isleft="item.from == sessionInfo.account"></text-msg>
        </div>
      </div>
      <div class="bottom">
        <div class="line2"></div>
        <el-input class="inputArea" type="textarea" placeholder="请输入消息" v-model="textarea"
          @keydown.native="listen($event)">
        </el-input>
        <el-button :disabled="isSendImg" class="b font-14-500-ffffff flex-center-center" @click="SendText">发送</el-button>
      </div>
      <!-- 表情 -->
      <!-- <el-popover placement="top" :width="fileImageWidth" trigger="click" style="margin-right: 20px; position: fixed">
        <p>最多可上传1张图片</p>
        <el-upload action="#" ref="imageUpload" list-type="picture-card"
          :on-change="(file, fileList) => handleImageChange(file, fileList)"
          :on-remove="(file, fileList) => handleImageRemove(file, fileList)" :auto-upload="false" accept="image/*"
          :limit="1" :on-exceed="handleImageExceed">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
        <el-button style="bottom: 150px" class="emj_img_btn" slot="reference" @click="$refs.imageUpload.clearFiles()"><img
            src="../../assets/images/xcm/t.png" alt="" /></el-button>
      </el-popover> -->
      <!-- 图片 -->
      <el-popover placement="top" :width="fileImageWidth" trigger="click" style="margin-right: 20px; position: fixed">
        <p>最多可上传1张图片</p>
        <el-upload action="#" ref="imageUpload" list-type="picture-card" :on-change="
          (file, fileList) => $emit('handleImageChange', file, fileList)
        " :on-remove="
  (file, fileList) => $emit('handleImageRemove', file, fileList)
" :auto-upload="false" accept="image/*" :limit="1" :on-exceed="handleImageExceed">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
        <el-button style="bottom: 18px;" class="emj_img_btn" slot="reference" @click="$refs.imageUpload.clearFiles()"><img
            src="../../assets/images/xcm/c.png" alt="" /></el-button>
      </el-popover>
    </div>
  </div>
</template>

<script>
import ImgMsg from "./MsgType/ImgMsg.vue";
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
  components: { ImgMsg, TextMsg, TimeLine },
  data() {
    return {
      textarea: "",

      dialogVisible: false,
      dialogImageUrl: "",

      lastpos: 0,
      serverTag: "h_", // TODO
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
        var time = this.isSendImg ? 1000 : 200;

        console.log("时间" + time); // 这里发图片就延时1秒 发文本延时200毫秒
        setTimeout(() => {
          root.scrollTop = root.scrollHeight;
        }, time);
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

  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  line-height: 20px;
}

::-webkit-scrollbar {
  width: 0px;
}

.fixPos {
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000000;
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
  width: 375px;
  height: 100vh;
  background: #f6f7fb;

  position: relative;

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

    .return {
      position: absolute;
      right: 10px;

      width: 60px;
      height: 32px;
      background: #8135ff;
      border-radius: 5px;
      color: #ffffff !important;
    }
  }

  .line1 {
    position: absolute;
    width: 375px;
    height: 1px;
    opacity: 0.5;
    background-color: #9a9a9a;
  }

  .center {
    width: 375px;
    max-height: calc(100% - 110px);
    overflow: scroll;
    overflow-x: hidden;
  }

  .bottom {
    position: fixed;
    bottom: 0;
    width: 375px;
    height: 50px;

    .line2 {
      position: absolute;
      width: 100%;
      height: 1px;
      opacity: 0.5;
      background-color: #9a9a9a;
    }

    .inputArea {
      width: 300px;
      height: 50px;
      background: #FFFFFF;
      border-radius: 23px;
      margin-top: 5px;
      margin-left: 30px;
    }

    .b {
      position: absolute;
      bottom: 10px;
      right: 5px;

      width: 60px;
      height: 32px;
      background: #8135ff;
      border-radius: 5px;
      color: #ffffff !important;
    }
  }
}
</style>