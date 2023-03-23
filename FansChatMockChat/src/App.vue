<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    this.ListenWindowRoot();
  },
  methods: {
    ListenWindowRoot() {
      window.addEventListener("load", () => this.Adaptive());
      window.onresize = () => this.Adaptive();
    },
    Adaptive() {
      let html = document.documentElement;
      let rootFont = document.body.clientWidth;

      html.style.fontSize = "20px";

      // if (rootFont < 768) {
      //   console.log(rootFont);
      //   html.style.fontSize = `${rootFont / 20}px`;
      //   console.log(html.style.fontSize, "手机端");
      // } else {
      //   html.style.fontSize = "20px";
      //   console.log(html.style.fontSize, "PC端1");
      // }
    },
  },
};
</script>

