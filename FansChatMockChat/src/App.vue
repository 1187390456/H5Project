<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { ReSetIM } from "../src/utils/xcm";
export default {
  name: "App",
  created() {
    // this.Init();
  },
  mounted() {
    ReSetIM(this);
  },
  methods: {
    // 初始数据
    async Init() {
      var res = await userInfo({ userID: 1, nickname: "123123" });
      if (!res.result) return this.$message.error("后台错误!");
      this.dataInfo = res.data;

      sessionStorage.setItem("operateInfo", JSON.stringify(res.data.operator));
      sessionStorage.setItem("bloggerInfo", JSON.stringify(res.data.blogger));
    },
  },
};
</script>

