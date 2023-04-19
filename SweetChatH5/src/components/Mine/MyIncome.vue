<template>
  <div class="my-income">
    <common-header>
      <template #title>My income</template>
      <template #right>Potential</template>
    </common-header>
    <div class="main">
      <!-- 当前收益 -->
      <div class="current-yield">
        <div class="title">当前收益</div>
        <div class="content">
          <div class="left">
            <img src="../../assets/images/mine/money.png" alt="" />
            <span>5934</span>
          </div>
          <div class="right">提现</div>
        </div>
      </div>

      <!-- 收支明细 -->
      <div class="income-details">
        <div class="title">收支明细</div>
        <ul>
          <li>
            <div class="top">
              <div class="date">12月12日 16:24</div>
              <!-- <div class="money-income">
                <img src="../../assets/images/mine/money.png" alt="" />
                <span>+300</span>
              </div> -->
              <div class="money-withdrawal">-$23.0</div>
            </div>
            <div class="bottom">
              <!-- <div class="reply-msg">
                回复了Region Micheal的消息，你获得300金币奖励
              </div> -->
              <div class="withdrawal-msg">
                <p>提现$23.0至Payoneer(3464)</p>
                <p>提现成功<van-icon name="arrow" /></p>
              </div>
            </div>
          </li>
        </ul>
      </div>
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
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getIncomeList();
  },
  methods: {
    getIncomeList() {
      this.$api.incomeRecordList({ pageNum: 1 }).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style scoped lang="scss">
.my-income {
  .main {
    padding: 0.64rem /* 12/18.75 */;

    .common-card {
      width: 100%;
      // width: 18.72rem /* 351/18.75 */;
      box-sizing: border-box;
      background: #fff;
      border-radius: 0.64rem /* 12/18.75 */;
      padding: 1.066667rem /* 20/18.75 */ 0.853333rem /* 16/18.75 */ 1.28rem
        /* 24/18.75 */;
    }

    .current-yield {
      @extend .common-card;
      height: 6.933333rem /* 130/18.75 */;

      .title {
        font-size: 0.746667rem /* 14/18.75 */;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #3c3647;
      }

      .content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 1.386667rem /* 26/18.75 */;

        .left {
          img {
            width: 2.133333rem /* 40/18.75 */;
            height: 2.133333rem /* 40/18.75 */;
          }

          span {
            font-size: 2.666667rem /* 50/18.75 */;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #3c3647;
          }
        }

        .right {
          color: #fff;
          width: 4.266667rem /* 80/18.75 */;
          height: 1.6rem /* 30/18.75 */;
          line-height: 1.6rem /* 30/18.75 */;
          background: #8f4afe;
          border-radius: 0.8rem /* 15/18.75 */;
          text-align: center;
        }
      }
    }

    .income-details {
      @extend .common-card;
      margin-top: 0.64rem /* 12/18.75 */;

      .title {
        font-size: 0.746667rem /* 14/18.75 */;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #3c3647;
      }

      ul {
        margin-top: 0.64rem /* 12/18.75 */;

        li {
          padding: 0.64rem /* 12/18.75 */ 0;

          &:not(:last-of-type) {
            border: 0.053333rem /* 1/18.75 */ solid #ececec;
          }

          &:last-of-type {
            padding-bottom: 0;
          }

          .common-income-msg {
            width: 100%;
            display: flex;
            justify-content: space-between;
            font-size: 0.693333rem /* 13/18.75 */;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #9896a0;
          }

          .top {
            @extend .common-income-msg;

            .money-income {
              display: flex;
              align-items: center;

              img {
                width: 0.853333rem /* 16/18.75 */;
                height: 0.853333rem /* 16/18.75 */;
              }

              span {
                color: #8f4afe;
                margin-left: 0.053333rem /* 1/18.75 */;
              }
            }

            .money-withdrawal {
              color: #000000;
            }
          }

          .bottom {
            @extend .common-income-msg;
            margin-top: 0.213333rem /* 4/18.75 */;
            display: block;

            .reply-msg {
              width: 12.533333rem /* 235/18.75 */;
            }

            .withdrawal-msg {
              display: flex;
              justify-content: space-between;
              align-items: center;

              p {
                margin: 0;

                &:last-of-type {
                  color: #707179;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
