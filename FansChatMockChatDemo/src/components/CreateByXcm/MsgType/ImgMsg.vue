<template>
  <div class="imgMsg">
    <el-image class="img" :src="info.file.url" fit="cover" :lazy="false" :preview-src-list="[info.file.url]"></el-image>
    <div class="float">{{ info.time | timeFilter }} PM</div>
  </div>
</template>

<script>
import { formatDate } from "../../../utils/xcm";
export default {
  props: {
    info: {
      default: {},
      type: Object,
    },
  },
  filters: {
    timeFilter(val) {
      return formatDate(val, "hh:mm");
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .el-image {
  display: flex;
}

.imgMsg {
  margin-top: 0.1rem;
  max-width: 14.45rem;
  border-radius: 0.4rem 0.75rem 0.75rem 0.4rem;
  position: relative;

  .img {
    border-radius: 0.4rem 0.75rem 0.75rem 0.4rem;
  }

  .img:after {
    content: "查看原图";
    color: #fff;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
    opacity: 0;
    transition: all 0.3s;
  }

  .img:hover:after {
    opacity: 1;
  }

  .float {
    position: absolute;
    bottom: 0.3rem;
    right: 0.3rem;
    padding: 0.1rem 0.35rem;
    line-height: 0.8rem;
    background: #ffffff;
    border-radius: 0.45rem;
    opacity: 0.6;
    font-size: 0.5rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #2D2D2D;
    line-height: 0.7rem;
  }
}
</style>