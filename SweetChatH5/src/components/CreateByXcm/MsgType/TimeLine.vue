<template>
  <div class="timeLine flex-center-center">
    <div class="time font-10-500-ffffff">{{ timeInfo | timeFilter }}</div>
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
  height: 40px;
  width: 100%;

  .time {
    padding: 2px 7px;
    background: #b6b6b6;
    border-radius: 9px;
  }
}
</style>