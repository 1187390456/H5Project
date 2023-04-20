<template>
  <div class="container-mine">
    <!-- 个人信息 -->
    <div class="info" @click="OnClickBlogger">
      <img
        class="avatar"
        src="https://img0.baidu.com/it/u=1993557595,4075530522&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1681923600&t=9b6dddbe05c446e1ace6f480f70ef88c"
        alt=""
      />
      <div class="info-detail">
        <div class="name">Taylor Swift</div>
        <div class="gender">
          <img src="@/assets/images/mine/male.png" alt="" /><span>23</span>
        </div>
        <span>ID： 485904843</span>
      </div>
      <img class="right" src="@/assets/images/mine/right.png" alt="" />
    </div>
    <!-- 收入 -->
    <div class="income">
      <img class="income-bg" src="@/assets/images/mine/income-bg.png" alt="" />
      <div>
        <div class="one">
          <div>
            <span>Current Income</span>
            <img class="icon" src="@/assets/images/mine/money.png" alt="" />
          </div>
          <div>Yesterday</div>
        </div>
        <div class="two">
          <div>
            <span>40000</span>
            <img
              class="icon"
              src="@/assets/images/mine/income-right.png"
              alt=""
            />
          </div>
          <div>+5000</div>
        </div>
        <van-divider class="divider" />
        <div class="three">
          <div>Potential Income</div>
          <div>
            <span>30000</span>
            <img src="@/assets/images/mine/income-right.png" alt="" />
          </div>
        </div>
      </div>
    </div>
    <!-- 链接分享 -->
    <div class="share">
      <div class="share-detail">
        <div>
          <p>Share SweetFans</p>
          <p>Invite fans to chat with you</p>
        </div>
        <img src="@/assets/images/mine/app.png" alt="" />
      </div>
      <div class="share-link">
        <img src="@/assets/images/mine/link.png" alt="" />
        <span>Copy the link and Share it</span>
      </div>
    </div>
    <!-- 设置 -->
    <div class="settings">
      <div
        v-for="(item, index) in settingList"
        :key="index"
        @click="$root.$emit('changeNextType', index + 1)"
      >
        <img :src="item.icon" alt="" />
        <span>{{ item.title }}</span>
        <img class="right" src="@/assets/images/mine/right.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  components: {},
  data() {
    return {
      settingList: [
        {
          icon: require("@/assets/images/mine/income.png"),
          title: "My income",
        },
        {
          icon: require("@/assets/images/mine/account.png"),
          title: "Account authorization",
        },
        {
          icon: require("@/assets/images/mine/wallet.png"),
          title: "My wallet",
        },
        {
          icon: require("@/assets/images/mine/issue.png"),
          title: "Issue feedback",
        },
        {
          icon: require("@/assets/images/mine/setting.png"),
          title: "Other settings",
        },
      ],
    };
  },
  computed:{
    ...mapGetters(["loginInfo"])
  },
  methods:{
    // 跳转个人主页
    OnClickBlogger() {
      var info = this.loginInfo.userInfo
      info.userID = this.loginInfo.userInfo.id
      this.$router.push({ path: '/bloggerInfo', query: { info } });
    }
  },
};
</script>

<style scoped lang="scss">
.container-mine {
  object-fit: over;
  padding: 1.6rem 0.64rem 0 0.64rem;
  .info {
    display: flex;
    align-items: center;
    .avatar {
      width: 3.6267rem;
      height: 3.6267rem;
      border-radius: 50%;
    }
    .info-detail {
      flex: 1;
      margin-left: 0.64rem;
      .name {
        font-size: 0.9067rem;
        color: #111118;
        height: 1.28rem;
        line-height: 1.28rem;
      }
      .gender {
        margin: 0.2133rem 0;
        width: 1.92rem;
        height: 0.8533rem;
        background: #ff77b5;
        border-radius: 0.5333rem;
        font-size: 0.5333rem;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 0.64rem;
          height: 0.64rem;
        }
        span {
          color: #fff;
          width: 0.64rem;
          height: 0.7467rem;
          line-height: 0.7467rem;
        }
      }
      span {
        font-family: PingFangSC-Regular, PingFang SC;
        color: #9a9a9a;
        font-size: 0.64rem;
        height: 0.9067rem;
        line-height: 0.9067rem;
      }
    }
    .right {
      width: 1.28rem;
      height: 1.28rem;
    }
  }
  .income {
    position: relative;
    margin-top: 1.0667rem;
    height: 7.6267rem;
    .icon {
      width: 1.0667rem;
      height: 1.0667rem;
    }
    .income-bg {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
    }
    > div {
      padding: 0.8533rem 0 0.64rem 0;
      color: #fff;
      font-size: 0.7467rem;
      .one,
      .two,
      .three {
        display: flex;
        align-items: center;
        justify-content: space-between;
        > div {
          padding: 0 0.8533rem;
          display: flex;
          align-items: center;
          height: 1.0667rem;
          line-height: 1.0667rem;
        }
      }
      .one {
        font-family: PingFangSC-Regular, PingFang SC;
        img {
          margin-left: 0.2133rem;
        }
      }
      .two {
        font-size: 1.0667rem;
        margin-top: 0.4267rem;
        > div {
          height: 2.1333rem;
          line-height: 2.1333rem;
        }
        img {
          margin-left: 0.4267rem;
        }
      }
      .three {
        > div {
          &:first-of-type {
            font-family: PingFangSC-Regular, PingFang SC;
          }
        }
        img {
          width: 0.64rem;
          height: 0.64rem;
          margin-left: 0.32rem;
        }
      }
    }
    .divider {
      margin: 0.7467rem 0 0.64rem 0;
    }
  }
  .share {
    margin: 0.64rem 0;
    // height: 7.4133rem;
    background: #fefefe;
    border-radius: 0.8533rem;
    padding: 0.8533rem;
    .share-detail {
      display: flex;
      align-items: center;
      justify-content: space-between;
      p {
        margin: 0;
        &:first-of-type {
          font-size: 0.8533rem;
          color: #8032ff;
          height: 1.1733rem;
          line-height: 1.1733rem;
        }
        &:last-of-type {
          font-size: 0.7467rem;
          font-family: PingFangSC-Regular, PingFang SC;
          color: #7f7f7f;
          height: 1.0667rem;
          line-height: 1.0667rem;
        }
      }
      img {
        width: 4.16rem;
        height: 1.6rem;
      }
    }
    .share-link {
      margin-top: 0.9067rem;
      width: 14.24rem;
      height: 2.4533rem;
      font-size: 0.7467rem;
      background: #ffefd1;
      border-radius: 1.2267rem;
      color: #f6892c;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 1.0667rem;
        height: 1.0667rem;
        margin-right: 0.4267rem;
      }
    }
  }
  .settings {
    // padding-bottom: 16px;
    > div {
      padding: 0 0.8533rem 0 0.64rem;
      background-color: #fff;
      height: 2.9867rem;
      display: flex;
      align-items: center;
      img {
        width: 1.28rem;
        height: 1.28rem;
      }
      span {
        font-size: 0.8533rem;
        font-family: PingFangSC-Regular, PingFang SC;
        flex: 1;
        margin-left: 0.64rem;
      }
      .right {
        width: 1.0667rem;
        height: 1.0667rem;
      }
      &:first-of-type {
        border-radius: 0.8533rem 0.8533rem 0rem 0rem;
      }
      &:last-of-type {
        border-radius: 0rem 0rem 0.8533rem 0.8533rem;
      }
    }
  }
}
</style>
