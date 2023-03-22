<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { getUrlKey, recordHand, listenDownInfo } from "./utils/tools";
import { homepage } from "../api/PersonPage";
export default {
  created() {
    this.ListenWindowRoot();
    this.ParamCatch();
  },
  methods: {
    ListenWindowRoot() {
      window.addEventListener("load", () => this.Adaptive());
      window.onresize = () => this.Adaptive();
    },
    Adaptive() {
      let html = document.documentElement;
      let rootFont = document.body.clientWidth;
      if (rootFont < 768) {
        console.log(rootFont);
        html.style.fontSize = `${rootFont / 20}px`;
        console.log(html.style.fontSize, "手机端");
      } else {
        html.style.fontSize = "20px";
        console.log(html.style.fontSize, "PC端1");
      }
    },
    // 根据参数判断跳转
    ParamCatch() {
      var u = getUrlKey("u");
      var t = getUrlKey("t");
      var datajson = {};
      var name = "personalPage";
      // 博主注册
      if (u == 0 && t == 1) {
        name = "downLoad";
        datajson = { jumpType: { type: "becomeBlogger", jsonData: {} } };
        this.SaveAndPush(datajson, name);
      } else if (u != 0 && t == 0) {
        // 获取用户信息
        var userID = getUrlKey("u");
        homepage({ userID, targetUserID: userID }).then((res) => {
          if (!res.result) {
            console.log("后台出错");
            name = "downLoad";
            datajson = {};
            this.SaveAndPush(datajson, name);
          } else {
            var isBlogger = res.data.userInfo.isBlogger;
            // 博主分享
            if (isBlogger) {
              // 记录 打开链接 1
              recordHand(1);
              datajson = {
                jumpType: { type: "becomeFans", jsonData: { userID } },
              };
              this.SaveAndPush(datajson, name);
            } else {
              // 其他人分享
              name = "downLoad";
              datajson = {};
              this.SaveAndPush(datajson, name);
            }
          }
        });
      } else {
        name = "downLoad";
        datajson = {};
        this.SaveAndPush(datajson, name);
      }
    },
    // 保存
    SaveAndPush(datajson, name) {
      // 监听
      listenDownInfo(datajson, this.$listenObj);
      // 跳转
      this.$router.push({ name, query: null });
    },
  },
};
</script>
<style lang="less">
#app {
  font-family: PingFangSC-Medium, PingFang SC;
}
</style>
