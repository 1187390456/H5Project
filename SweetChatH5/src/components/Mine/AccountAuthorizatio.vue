<template>
  <div class="account-authorizatio">
    <common-header>
      <template #title>Account authorizatio</template>
    </common-header>

    <div class="main">
      <div class="authorization">
        <img src="../../assets/images/mine/handshake.png" alt="" />
        <p>No time? Try account authorization!</p>
        <span>Outsourcing for better time management</span>
      </div>

      <!-- 授权方式 -->
      <ul>
        <li>
          <img src="../../assets/images/mine/official.png" alt="" />
          <div>
            <p>Authorize to the official</p>
            <span>Personalized management</span>
          </div>
          <img src="../../assets/images/mine/right.png" alt="" />
        </li>
        <li>
          <img src="../../assets/images/mine/transfer_user.png" alt="" />
          <div>
            <p>Authorize to others</p>
            <span>Authorize up to 3 accounts</span>
          </div>
          <img src="../../assets/images/mine/right.png" alt="" />
        </li>
      </ul>

      <!-- 已授权的用户 -->
      <dl>
        <dt>
          <span>Authorized accounts</span>
          <div>
            <img src="../../assets/admin_super_avatar.png" alt="" />
            Currently in use
          </div>
        </dt>
        <dd>
          <div>
            <img src="../../assets/images/mine/official.png" alt="" />
            <span>SweetFans Official</span>
            <div>Revoke</div>
          </div>
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
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="scss">
.account-authorizatio {
  background: #f8f9fc;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;

  .main {
    padding: 1.066667rem /* 20/18.75 */ 0.64rem /* 12/18.75 */;
    .authorization {
      text-align: center;

      img {
        width: 5.333333rem /* 100/18.75 */;
        height: 5.333333rem /* 100/18.75 */;
      }

      p {
        font-size: 0.96rem /* 18/18.75 */;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #000000;
        margin: 0;
        margin: 1.12rem /* 21/18.75 */ 0 0.266667rem /* 5/18.75 */;
      }

      span {
        font-size: 0.746667rem /* 14/18.75 */;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #727272;
      }
    }

    ul {
      margin-top: 2.026667rem /* 38/18.75 */;

      li {
        width: 100%;
        height: 4.16rem /* 78/18.75 */;
        background: #fefefe;
        border-radius: 0.64rem /* 12/18.75 */;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 1.066667rem /* 20/18.75 */;
        padding-right: 0.853333rem /* 16/18.75 */;
        box-sizing: border-box;

        > div {
          flex: 1;
          margin-left: 0.64rem /* 12/18.75 */;

          p {
            font-size: 0.853333rem /* 16/18.75 */;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #161616;
            margin: 0;
          }

          span {
            font-size: 0.64rem /* 12/18.75 */;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #939393;
          }
        }

        img:first-of-type {
          width: 2.133333rem /* 40/18.75 */;
          height: 2.133333rem /* 40/18.75 */;
        }

        img:last-of-type {
          width: 1.066667rem /* 20/18.75 */;
          height: 1.066667rem /* 20/18.75 */;
        }

        &:last-of-type {
          margin-top: 0.64rem /* 12/18.75 */;
        }
      }
    }

    dl {
      margin-top: 1.6rem /* 30/18.75 */;

      dt {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.64rem /* 12/18.75 */;

        span {
          font-size: 0.746667rem /* 14/18.75 */;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #a9a9a9;
        }

        div {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.746667rem /* 14/18.75 */;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #000000;

          img {
            width: 1.28rem /* 24/18.75 */;
            height: 1.28rem /* 24/18.75 */;
            margin-right: 0.213333rem /* 4/18.75 */;
          }
        }
      }

      dd {
        width: 100%;
        height: 2.88rem /* 54/18.75 */;
        background: #fefefe;
        border-radius: 0rem 0rem 0.64rem /* 12/18.75 */ 0.64rem /* 12/18.75 */;
        box-sizing: border-box;
        margin: 0;

        &:not(:last-of-type) {
          > div {
            border-bottom: 1px solid rgba(197, 197, 209, 0.25);
            box-sizing: border-box;
          }
        }

        > div {
          height: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 0 0.853333rem /* 16/18.75 */;

          img {
            width: 1.92rem /* 36/18.75 */;
            height: 1.92rem /* 36/18.75 */;
            border-radius: 50%;
          }

          span {
            font-size: 0.853333rem /* 16/18.75 */;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #000000;
            flex: 1;
            margin-left: 0.426667rem /* 8/18.75 */;
          }

          div {
            width: 4.266667rem /* 80/18.75 */;
            height: 1.92rem /* 36/18.75 */;
            line-height: 1.92rem /* 36/18.75 */;
            background: #c9c9c9;
            border-radius: 0.96rem /* 18/18.75 */;
            text-align: center;
            font-size: 0.746667rem /* 14/18.75 */;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #ffffff;
          }
        }
      }
    }
  }
}
</style>
