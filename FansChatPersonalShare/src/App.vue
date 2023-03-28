<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { recordHand, getParams } from "./utils/tools";
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

      console.log('获取到的', rootFont);
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
      var u = getParams().u;
      var t = getParams().t;
      console.log("获取到的id为", u);
      console.log("获取到的type为", t);

      //  此处传了type  跳下载页
      if (t == 0 || t == 1 || t == 2) {
        sessionStorage.setItem('type', t);
        this.$router.push({ name: 'downLoad', params: { u } });
      }
      else {
        this.NoTypeCatch(u);
      }
    },
    // 没传type的正常流程
    async NoTypeCatch(u) {
      //  正常流程
      if (u == 'invite') {
        console.log('博主');
        sessionStorage.setItem('type', 0);
        this.$router.push({ name: 'downLoad', params: { u } });
        return;
      }
      else {
        var res = await homepage({ userID: u, targetUserID: u });
        if (res.errorCode == 0) {
          if (res.data.userInfo.isBlogger) { // 此人是博主
            console.log('粉丝');
            sessionStorage.setItem('type', 1);
            sessionStorage.setItem('gender', res.data.userInfo.gender); // 1 男 2 女 
            recordHand(1);
            this.$router.push({ name: 'personalPage', params: { u } });
          }
          else {
            console.log('路人');
            sessionStorage.setItem('type', 2);
            this.$router.push({ name: 'downLoad', params: { u } });
          }
          return;
        }
        else { // 100 不存在 102 已注销 或者其他
          console.log("路人", res.errorCode);
          sessionStorage.setItem('type', 2);
          this.$router.push({ name: 'downLoad', params: { u } });
          return;
        }
      }
    }
  },
};
</script>
<style lang="less">
#app {
  font-family: PingFangSC-Medium, PingFang SC;
}
</style>
