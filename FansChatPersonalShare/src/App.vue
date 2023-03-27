<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { recordHand, listenDownInfo, getUrlUserId } from "./utils/tools";
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
      var u = getUrlUserId();
      console.log("获取到的id为", u);

      var datajson = {};
      var name;

      // 博主注册  u=0
      if (u == 0 || u == null) {
        console.log("博主注册");
        name = "downLoad";
        datajson = { jumpType: { type: "becomeBlogger", jsonData: {} } };
        this.SaveAndPush(datajson, name);
        return;
      } else {
        console.log("个人主页");
        name = "personalPage";
        recordHand(1);
        datajson = {
          jumpType: { type: "becomeFans", jsonData: { userID: u } },
        };
        this.SaveAndPush(datajson, name);
        return;
      }
    },
    // 保存
    SaveAndPush(datajson, name) {
      console.log("跳转");
      sessionStorage.setItem("datajson", JSON.stringify(datajson));
      console.log(datajson);
      // 监听
      listenDownInfo(datajson, this.$listenObj);

      var u = getUrlUserId();
      // 跳转
      this.$router.push({ name, params: { u } });
    },
  },
};
</script>
<style lang="less">
#app {
  font-family: PingFangSC-Medium, PingFang SC;
}
</style>
