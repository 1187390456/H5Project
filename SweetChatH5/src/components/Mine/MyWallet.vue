<template>
  <div class="my-wallet">
    <common-header>
      <template #title>My wallet</template>
    </common-header>

    <div class="main">
      <div class="balance">
        <img class="bg" src="../../assets/images/mine/balance_bg.png" alt="" />
        <div class="left">Balance</div>
        <div class="right">
          <img src="../../assets/images/mine/money.png" alt="" />
          3156
        </div>
      </div>

      <!-- 购买金币种类 -->
      <ul>
        <li>
          <div class="coin">
            <img src="../../assets/images/mine/money.png" alt="" />500
          </div>
          <div class="money">$6.99</div>
        </li>
        <li>
          <div class="coin">
            <img src="../../assets/images/mine/money.png" alt="" />3500
          </div>
          <div class="money">$49.99</div>
        </li>
        <li>
          <div class="coin">
            <img src="../../assets/images/mine/money.png" alt="" />14000
          </div>
          <div class="money">$199.99</div>
        </li>
      </ul>

      <div class="recharge">Recharge now $49.99</div>

      <!-- 协议 -->
      <dl>
        <dt>
          <div @click="isChecked = !isChecked">
            <img
              v-if="isChecked"
              src="../../assets/images/mine/wallet_checked.png"
              alt=""
            />
            <img
              v-else
              src="../../assets/images/mine/wallet_unchecked.png"
              alt=""
            />
          </div>
          <span>Read and agree to <i>《User Recharge Agreement》</i></span>
        </dt>
        <dd>
          1.Coins can be used to purchase coin gifts and messages within the
          SweetFans app.
        </dd>
        <dd>
          2.Coins are virtual currency and once recharged, they do not expire.
          However, they cannot be refunded, withdrawn, or transferred to others.
        </dd>
        <dd>
          3.If the coins do not appear in your account immediately after
          recharging, please exit the SweetFans app completely and restart to
          check.
        </dd>
        <dd>
          4.If you encounter any problems during the recharge process, please
          contact the official support team through the 'Issue Feedback'
          feature.
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import CommonHeader from "./CommonHeader.vue";

export default {
  name: "",
  mixins: [],
  components: { CommonHeader },
  props: {},
  data() {
    return {
      isChecked: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getWalletList();
  },
  methods: {
    getWalletList() {
      this.$api.walletRecordList({ pageNum: 1 }).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style scoped lang="scss">
.my-wallet {
  height: 100%;
  background: #fff;

  .main {
    padding: 0.64rem /* 12/18.75 */ 0.853333rem /* 16/18.75 */;

    .balance {
      width: 18.293333rem /* 343/18.75 */;
      height: 5.76rem /* 108/18.75 */;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 1.28rem /* 24/18.75 */;
      padding-right: 1.066667rem /* 20/18.75 */;
      box-sizing: border-box;
      position: relative;

      .bg {
        width: 18.293333rem /* 343/18.75 */;
        height: 5.76rem /* 108/18.75 */;
        position: absolute;
        left: 0;
        right: 0;
      }

      .left {
        color: #fff;
        position: relative;
        font-size: 1.066667rem /* 20/18.75 */;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
      }

      .right {
        font-size: 1.493333rem /* 28/18.75 */;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #a14d1a;
        position: relative;
        display: flex;
        align-items: center;

        img {
          width: 1.6rem /* 30/18.75 */;
          height: 1.6rem /* 30/18.75 */;
          margin-right: 0.426667rem /* 8/18.75 */;
        }
      }
    }

    ul {
      margin-top: 1.066667rem /* 20/18.75 */;
      margin-bottom: 0.853333rem /* 16/18.75 */;
      display: flex;
      justify-content: space-between;

      li {
        width: 5.76rem /* 108/18.75 */;
        height: 4.16rem /* 78/18.75 */;
        background: #f8f8f8;
        border-radius: 0.426667rem /* 8/18.75 */;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .coin {
          font-size: 1.066667rem /* 20/18.75 */;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #151923;
          display: flex;
          align-items: center;
          justify-content: center;

          img {
            width: 1.173333rem /* 22/18.75 */;
            height: 1.173333rem /* 22/18.75 */;
          }
        }

        .money {
          font-size: 0.64rem /* 12/18.75 */;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #86878c;
          margin-top: 0.16rem /* 3/18.75 */;
        }
      }
    }

    .recharge {
      width: 100%;
      height: 2.346667rem /* 44/18.75 */;
      background: #8032ff;
      border-radius: 1.173333rem /* 22/18.75 */;
      text-align: center;
      font-size: 0.853333rem /* 16/18.75 */;
      line-height: 2.346667rem /* 44/18.75 */;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
    }

    dl {
      dt {
        display: flex;
        align-items: center;
        margin-bottom: 0.64rem /* 12/18.75 */;

        > div {
          width: 0.906667rem /* 17/18.75 */;
          height: 0.906667rem /* 17/18.75 */;

          img {
            width: 0.906667rem /* 17/18.75 */;
            height: 0.906667rem /* 17/18.75 */;
          }
        }

        span {
          font-size: 0.746667rem /* 14/18.75 */;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #9896a0;
          margin-left: 0.266667rem /* 5/18.75 */;

          i {
            font-style: normal;
            color: #8032ff;
          }
        }
      }

      dd {
        font-size: 0.64rem /* 12/18.75 */;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #9896a0;
        line-height: 1.066667rem /* 20/18.75 */;
        margin-left: 0;
      }
    }
  }
}
</style>
