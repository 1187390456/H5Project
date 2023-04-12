<template>
  <div class="fixPos">
    <div class="chatView">
      <div class="top ">
        <div class="l">
          <img @click="$emit('ReturnList')" class="return" src="../../assets/images/返回.png" alt="">
          <img class="avatar" :src="sessionInfo.avatar" alt="" />
          <span class="name">{{ sessionInfo.nick }}</span>
        </div>
        <div class="r"> 10 </div>
      </div>
      <div class="topline"></div>
      <div class="content" ref="chatViewRef">
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
        <el-input class="inputArea" type="textarea" placeholder="Enter a new message" v-model="textarea"
          @keydown.native="listen($event)">
        </el-input>
        <div class="btnlist">
          <img src="../../assets/images/麦克风2.png" alt="">
          <img src="../../assets/images/相册、照片-m.png" alt="">
          <img src="../../assets/images/表情笑脸.png" alt="">
          <img src="../../assets/images/礼物.png" alt="">
        </div>
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
      <!-- <el-popover placement="top" :width="fileImageWidth" trigger="click" style="margin-right: 20px; position: fixed">
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
      </el-popover> -->
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

  height: 42px;
  line-height: 32px;
  font-size: 15px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;

  background: #F9F9F9 !important;
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
  background: #ffffff;

  position: relative;

  .top {
    width: 375px;
    height: 2.6rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .l {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      max-width: 18rem;

      .return {
        width: 1.25rem;
        height: 1.25rem;
        margin-left: 0.6rem;
      }

      .avatar {
        height: 1.9rem;
        width: 1.9rem;
        border-radius: 50%;
        margin-left: 0.4rem;
      }

      .name {
        font-size: 0.8rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #161616;
        line-height: 1.1rem;
        margin-left: 0.4rem;
      }
    }

    .r {
      width: 1.1rem;
      height: 1.1rem;
      background: #0D57C0;
      border-radius: 0.45rem;
      font-size: 0.5rem;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #FFFFFF;
      line-height: 1.1rem;
      text-align: center;

      margin-right: 0.8rem;
    }
  }

  .topline {
    width: 375px;
    height: 3px;
    background-color: #F7F7F7;
  }

  .content {
    width: 375px;
    max-height: calc(100% - 160px);
    overflow: scroll;
    overflow-x: hidden;

    padding: 0 0.4rem;
    box-sizing: border-box;
  }

  .bottom {
    position: fixed;
    bottom: 0;
    width: 375px;
    height: 5.45rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    .inputArea {
      width: 17.15rem;
      border-radius: 0.5rem;
    }

    .btnlist {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      margin-top: 0.6rem;

      img {
        width: 1.05rem;
        height: 1.05rem;
      }
    }
  }

}
</style>