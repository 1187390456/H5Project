<template>
  <div class="textMsg">
    <div class="font-15-400-060606 wordBrake">{{ info.text }}</div>
    <div class="time">
      <span class="font-10-400-979797">{{ info.time | timeFilter }}</span>
    </div>
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
.textMsg {
  margin: 2px 0 0 10px;
  padding: 5px 13px;

  min-width: 15%;
  max-width: 45%;

  background: #ffffff;
  border-radius: 8px 15px 15px 8px;
  border: 1px solid #d7f8fc;

  .time {
    display: flex;
    justify-content: flex-end;
    margin-top: 3px;
  }
}
</style>