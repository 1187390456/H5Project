<template>
  <div class="textRoot">
    <div class="crash" v-if="!isleft && curId == bloggerId">
      <img src="../../../assets/images/jinbi.png" alt="" />
      <span class="center">+${{ moneyUnit }}</span>
      <img src="../../../assets/images/jiantou.png" alt="" />
    </div>

    <div class="textMsg">
      <div class="font-15-400-060606 wordBrake">
        {{ info.text }}
      </div>
      <div class="time">
        <span class="font-10-400-979797">{{ info.time | timeFilter }}</span>
      </div>
    </div>
    <!-- <span>{{ info.isUnreadable }}</span> -->
    <div class="crash" v-if="isleft && curId == bloggerId">
      <img src="../../../assets/images/jinbi.png" alt="" />
      <span class="center">+${{ moneyUnit }}</span>
      <img src="../../../assets/images/jiantou.png" alt="" />
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
    sessionInfo: {
      default: {},
      type: Object,
    },
    isleft: {
      default: true,
      type: Boolean,
    },
  },

  computed: {
    curId() {
      return this.info.from.slice(this.info.from.lastIndexOf("_") + 1);
    },
  },
  created() {
    this.bloggerId = sessionStorage.getItem("bloggerId");
    this.moneyUnit = JSON.parse(sessionStorage.getItem("dataInfo")).moneyUnit;
  },
  data() {
    return {
      bloggerId: "",
      moneyUnit: "",
    };
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
  min-width: 15%;
  max-width: 45%;

  display: flex;
  align-items: center;
  justify-content: center;
  .textMsg {
    margin: 2px 0 0 10px;
    padding: 5px 13px;

    min-width: 277px;
    min-height: 42px;

    background: #ffffff;
    border-radius: 8px 15px 15px 8px;
    border: 1px solid #d7f8fc;

    .time {
      display: flex;
      justify-content: flex-end;
      margin-top: 3px;
    }
  }
  .crash {
    background: #ff3b74;
    border-radius: 9px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    min-width: 67px;
    min-height: 16px;

    margin-left: 7px;
    padding: 3px 5px;

    .img {
      width: 100%;
      height: 100%;
    }
    .center {
      margin: 0 5px;

      font-size: 10px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 14px;
    }
  }
}
</style>