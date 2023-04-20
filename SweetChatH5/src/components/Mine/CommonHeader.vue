<template>
  <div class="mine-header">
    <div class="left" @click="handleBack">
      <img src="../../assets/images/mine/left@3x.png" alt="" />
    </div>
    <div class="title">
      <slot name="title"></slot>
    </div>
    <div class="right">
      <slot name="right" @click="$emit('click')"></slot>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "",
  mixins: [],
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.loginInfo.userInfo,
    }),
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleBack() {
      console.log(this.userInfo, "==");
      this.$router.back({
        query: {
          info: this.userInfo.id,
        },
      });
    },
  },
};
</script>

<style scoped lang="scss">
.mine-header {
  width: 100%;
  height: 2.773333rem /* 52/18.75 */;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.853333rem /* 16/18.75 */;
  box-sizing: border-box;

  .left {
    width: 1.28rem /* 24/18.75 */;
    height: 1.28rem /* 24/18.75 */;

    img {
      width: 1.28rem /* 24/18.75 */;
      height: 1.28rem /* 24/18.75 */;
    }
  }

  .title {
    font-size: 0.853333rem /* 16/18.75 */;
    font-family: Helvetica-Bold, Helvetica;
    font-weight: bold;
    color: #161616;
  }

  .right {
    font-size: 0.746667rem /* 14/18.75 */;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #8f4afe;
  }
}
</style>
