<template>
  <div class="textRoot">
    <div :class="['textMsg', isleft ? 'leftColor' : 'rightColor']">
      <div class="font-15-400-060606 wordBrake">{{ info.text }}</div>
      <div class="time">
        <span class="font-10-400-979797">{{ info.time | timeFilter }}</span>
      </div>
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
.readColor {
  background: #ff3c74;
  border-radius: 9px;
}

.unReadColor {
  background: #000000;
  border-radius: 9px;
  opacity: 0.4;
}

.leftColor {
  background: #ffffff;
}

.rightColor {
  background: #d7f8fc;
}

.textRoot {
  // min-width: 15%;
  // max-width: 45%;

  display: flex;
  align-items: center;
  justify-content: center;

  .textMsg {
    margin: 5px 10px 0 10px;
    // padding: 5px 13px;
    padding: 5px 7px 0px 8px;

    // min-width: 277px;
    // min-height: 42px;

    max-width: 277px;


    border-radius: 8px 15px 15px 8px;
    border: 1px solid #d7f8fc;

    .time {
      display: flex;
      justify-content: flex-end;
      margin: 3px 0;
    }
  }

  .crash {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-left: 0px;
    padding: 3px 5px;

    .img {
      width: 100%;
      height: 100%;
    }

    .center {
      margin: 0 2px;

      font-size: 10px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 14px;
    }
  }
}
</style>