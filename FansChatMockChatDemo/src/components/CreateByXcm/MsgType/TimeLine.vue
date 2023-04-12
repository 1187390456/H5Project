<template>
  <div class="timeLine flex-center-center">
    <div class="time">{{ timeInfo | timeFilter }}</div>
  </div>
</template>

<script>
import { formatDate } from "../../../utils/xcm";
export default {
  props: {
    timeInfo: {
      default: 0,
      type: Number,
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
.timeLine {
  width: 100%;
  min-height: 0.85rem;

  .time {
    font-size: 0.6rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #B2B2B2;
    line-height: 0.85rem;
  }
}
</style>