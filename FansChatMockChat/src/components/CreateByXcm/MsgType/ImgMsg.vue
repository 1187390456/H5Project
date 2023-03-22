<template>
  <div class="imgMsg">
    <el-image
      class="img"
      :src="info.file.url"
      fit="cover"
      :lazy="false"
      :preview-src-list="[info.file.url]"
    ></el-image>
    <div class="float font-10-400-5F5F5F">{{ info.time | timeFilter }}</div>
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
.imgMsg {
  margin: 2px 0 0 10px;

  min-width: 15%;
  height: 300px;
  border-radius: 8px 15px 15px 8px;
  border: 1px solid #d7f8fc;

  position: relative;

  .img {
    width: 100%;
    height: 100%;
    border-radius: 8px 15px 15px 8px;
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
    bottom: 6px;
    right: 6px;

    padding: 2px 7px;
    line-height: 16px;

    background: #ffffff;
    border-radius: 9px;
    opacity: 0.6;
  }
}
</style>