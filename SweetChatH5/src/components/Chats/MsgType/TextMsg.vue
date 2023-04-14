<template>
  <div class="textRoot">
    <div :class="['textMsg', isleft ? 'leftColor' : 'rightColor']">
      <div class="text wordBrake">{{ info.text }}</div>
      <div class="time"> {{ info.time | timeFilter }} PM </div>
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
    isleft: {
      default: true,
      type: Boolean,
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
.textRoot {
  margin-top: 4px;

  .textMsg {
    padding: 4px 12px;
    max-width: 277px;
    border-radius: 8px 15px 15px 8px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .text {
      font-size: 15px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #060606;
      line-height: 21px;
    }

    .time {
      display: flex;
      justify-content: flex-end;

      font-size: 10px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #979797;
      line-height: 14px;
    }
  }
}

.leftColor {
  background: #F9F9F9;
}

.rightColor {
  background: #FEEDDE;
}
</style>