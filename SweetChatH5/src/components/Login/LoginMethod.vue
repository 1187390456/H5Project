<template>
  <div class="login-method">
    <!-- app名称 -->
    <div class="app-name">
      <img src="../../assets/images/login/app_name@3x.png" alt="" />
    </div>
    <!-- 登录方式 -->
    <ul>
      <li @click="handleToLogin(5)">
        <img src="../../assets/images/login/facebook@3x.png" alt="" />
        <p>Continue with Facebook</p>
      </li>
      <li @click="handleToLogin(6)">
        <img src="../../assets/images/login/google@3x.png" alt="" />
        <p>Continue with Google</p>
      </li>
      <!-- <li @click="handleToLogin(4)">
        <img src="../../assets/images/login/apple@3x.png" alt="" />
        <p>Continue with Apple</p>
      </li>
      <div class="separation-line">
        <i></i>
        <p>or you can continue with</p>
        <i></i>
      </div>
      <li @click="handleToLogin(1)">
        <img src="../../assets/images/login/iphones@3x.png" alt="" />
        <p>Phone Number</p>
      </li> -->
    </ul>
    <!-- 同意相关协议 -->
    <div class="agreement">
      <div @click="handleAgree">
        <img
          v-if="isChecked"
          src="../../assets/images/login/checked@3x.png"
          alt=""
        />
        <img v-else src="../../assets/images/login/unchecked@3x.png" alt="" />
      </div>
      <p>
        Agree to
        <a href="#">Privacy Policy</a>
        and
        <a href="#">Terms of Service</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  mixins: [],
  components: {},
  props: {},
  data() {
    return {
      isChecked: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleAgree() {
      this.isChecked = !this.isChecked;
    },

    handleToLogin(type) {
      switch (type) {
        case 1:
          // 手机号登录
          this.$emit("changeLoginMethod", 1);
          break;
        case 4:
          // 苹果账号授权登录
          break;
        case 5:
          // Facebook授权登录
          break;
        case 6:
          // 谷歌授权登录
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.login-method {
  // font-family: PingFangSC-Medium, PingFang SC;
  width: 100%;
  height: 100%;
  // overflow: auto;
  // scrollbar-width: none; //（仅限firefox）
  // -ms-overflow-style: none; //（仅限IE 10+）

  // &::-webkit-scrollbar {
  //   display: none; /* Chrome Safari */
  // }

  .app-name {
    text-align: center;
    font-size: 0rem;
    // margin-top: 13.066667rem /* 245/18.75 */;
    margin-top: 10.72rem /* 201/18.75 */;

    img {
      width: 14.293333rem /* 268/18.75 */;
      height: 1.973333rem /* 37/18.75 */;
    }
  }

  ul {
    margin-top: 7.573333rem /* 142/18.75 */;

    li {
      width: 16.16rem /* 303/18.75 */;
      height: 2.24rem /* 42/18.75 */;
      background: #ffffff;
      box-shadow: 0rem 0.053333rem 0.106667rem 0rem rgba(185, 185, 185, 0.5);
      border-radius: 0.533333rem /* 10/18.75 */;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      margin: 0rem auto 0.64rem /* 12/18.75 */;

      img {
        width: 1.066667rem /* 20/18.75 */;
        height: 1.066667rem /* 20/18.75 */;
        position: absolute;
        left: 0.853333rem /* 16/18.75 */;
        top: 0;
        bottom: 0;
        margin: auto;
      }

      p {
        font-style: 0.853333rem /* 16/18.75 */;
        position: relative;
        left: 0.053333rem; /* 1/18.75 */
      }
    }

    .separation-line {
      height: 2.133333rem /* 40/18.75 */;
      display: flex;
      justify-content: center;
      align-items: center;

      i {
        width: 3.893333rem /* 73/18.75 */;
        height: 0.053333rem /* 1/18.75 */;
        background-color: #ffffff;
        border-radius: 0.053333rem /* 1/18.75 */;
        opacity: 0.2;
      }

      p {
        font-size: 0.64rem /* 12/18.75 */;
        color: rgba(225, 225, 225, 0.6);
        font-family: PingFangSC-Regular, PingFang SC;
        margin: 0 0.48rem 0 0.5333rem;
      }
    }
  }

  .agreement {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 4.533333rem /* 85/18.75 */;
    // position: fixed;
    // bottom: 2.24rem /* 42/18.75 */;

    > div {
      font-size: 0rem;

      img {
        width: 0.906667rem /* 17/18.75 */;
        height: 0.906667rem /* 17/18.75 */;
      }
    }

    p {
      color: #fff;
      font-size: 0.64rem /* 12/18.75 */;
      font-family: PingFangSC-Regular;
      margin: 0;
      margin-left: 0.266667rem /* 5/18.75 */;

      a {
        font-family: PingFangSC-Medium;
        text-decoration: underline;
      }
    }
  }
}
</style>
