<!--
 * @Page: 
 * @Version: 1.0.0
 * @Autor: xumeng
 * @Date: 2021-09-01 15:50:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-04 11:34:03
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
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

      console.log("获取到的", rootFont);
      if (rootFont < 768) {
        console.log(rootFont);
        html.style.fontSize = `${rootFont / 20}px`;
        console.log(html.style.fontSize, "手机端");
      } else {
        html.style.fontSize = "20px";
        console.log(html.style.fontSize, "PC端1");
      }
    },
    ParamCatch() {},
  },
};
</script>
<style>
*,#app{
    outline: none;
}
</style>
