<template>
  <div class="potential-income">
    <common-header>
      <template #title>Potential Income</template>
    </common-header>

    <div class="main">
      <div class="much-money">
        <img src="../../assets/images/mine/much_money.png" alt="" />
        <p>Interact with the following users</p>
        <p>You can get gold coins</p>
      </div>

      <!-- 列表 -->
      <div class="user-list">
        <div class="title">Users who have purchased</div>
        <ul>
          <li>
            <div class="top">
              <div class="userinfo">
                <img src="../../assets/admin_super_avatar.png" alt="" />
                <span>Luchi Del Mar</span>
              </div>
              <!-- <div class="dm-box">
                <img src="../../assets/images/mine/msg.png" alt="" />
                DM
              </div> -->

              <div class="video-box">
                <img src="../../assets/images/mine/video.png" alt="" />
                Video Call
              </div>
            </div>
            <div class="bottom">
              <img src="../../assets/images/mine/money.png" alt="" />
              <span><i>320</i>/500</span>
              <span>Messages with 180 gold coins left</span>
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
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="scss">
.potential-income {
  .main {
    padding: 0.64rem /* 12/18.75 */;

    .much-money {
      text-align: center;

      img {
        width: 15.893333rem /* 298/18.75 */;
        height: 8.693333rem /* 163/18.75 */;
      }

      p {
        margin: 0;
        font-size: 0.746667rem /* 14/18.75 */;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #3e3e3e;

        &:first-of-type {
          margin-top: 1.12rem /* 21/18.75 */;
        }
      }
    }

    .user-list {
      margin-top: 1.066667rem /* 20/18.75 */;

      .title {
        font-size: 0.746667rem /* 14/18.75 */;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #a9a9a9;
      }

      ul {
        margin-top: 0.533333rem /* 10/18.75 */;

        li {
          background: #fefefe;
          border-radius: 0.64rem /* 12/18.75 */;
          margin-bottom: 0.32rem /* 6/18.75 */;
          padding: 0.64rem /* 12/18.75 */ 0.853333rem /* 16/18.75 */;

          .top {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .userinfo {
              display: flex;
              justify-content: center;
              align-items: center;
              img {
                width: 1.386667rem /* 26/18.75 */;
                height: 1.386667rem /* 26/18.75 */;
                border-radius: 50%;
              }

              span {
                margin-left: 0.426667rem /* 8/18.75 */;
                font-size: 0.853333rem /* 16/18.75 */;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #161616;
              }
            }

            .dm-box {
              width: 3.68rem /* 69/18.75 */;
              height: 1.546667rem /* 29/18.75 */;
              background: #ffefd1;
              border-radius: 15px;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 0.64rem /* 12/18.75 */;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #f6892c;

              img {
                width: 0.8rem /* 15/18.75 */;
                height: 0.8rem /* 15/18.75 */;
                margin-right: 0.213333rem /* 4/18.75 */;
              }
            }

            .video-box {
              width: 6.506667rem /* 122/18.75 */;
              height: 1.546667rem /* 29/18.75 */;
              background: #8032ff;
              border-radius: 0.8rem /* 15/18.75 */;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 0.746667rem /* 14/18.75 */;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #ffffff;

              img {
                width: 0.853333rem /* 16/18.75 */;
                height: 0.853333rem /* 16/18.75 */;
                margin-right: 0.426667rem /* 8/18.75 */;
              }
            }
          }

          .bottom {
            display: flex;
            align-items: center;
            margin-top: 0.48rem /* 9/18.75 */;

            img {
              width: 0.853333rem /* 16/18.75 */;
              height: 0.853333rem /* 16/18.75 */;
            }

            span:first-of-type {
              font-size: 0.746667rem /* 14/18.75 */;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: #9f9f9f;
              margin-left: 0.213333rem /* 4/18.75 */;
            }

            i {
              color: #8032ff;
              font-style: normal;
            }

            span:last-of-type {
              font-size: 0.746667rem /* 14/18.75 */;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #9896a0;
              margin-left: 0.426667rem /* 8/18.75 */;
            }
          }
        }
      }
    }
  }
}
</style>
