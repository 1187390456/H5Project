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
      <li @click="handleToLogin(4)">
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
      </li>
    </ul>
    <!-- 同意相关协议 -->
    <div class="agreement">
      <!-- <div @click="handleAgree">
        <img
          v-if="isChecked"
          src="../../assets/images/login/checked@3x.png"
          alt=""
        />
        <img v-else src="../../assets/images/login/unchecked@3x.png" alt="" />
      </div> -->
      <p>By signing up or continuing.you agree to</p>
      <p>
        <a href="https://www.sweetfans.love/privacy.html">Privacy Policy</a>
        and
        <a href="https://www.sweetfans.love/service.html">User Agreement</a>
      </p>
    </div>
  </div>
</template>

<script>
import jwt from "jsonwebtoken";

export default {
  name: "",
  mixins: [],
  components: {},
  props: {},
  data() {
    return {
      isChecked: false,
      client_id:
        "527306987343-auqpkaj7a2qacv2vp4f3jopie3g257h6.apps.googleusercontent.com", // Google
      redirect_uri: "http://localhost:8883/", // Google
      app_id: "634502518469740", // Facebook
      openId: "",
      accessToken: "",
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.tryGoogleRequest();

    // FB.getLoginStatus(function (response) {
    //   if (response.status === "connected") {
    //     // 用户已登录并授权
    //     var uid = response.authResponse.userID;
    //     var accessToken = response.authResponse.accessToken;
    //     console.log(uid, accessToken, "facebook login success ------");
    //     // 处理获取用户信息的逻辑
    //   } else if (response.status === "not_authorized") {
    //     // 用户已登录但未授权
    //   } else {
    //     // 用户未登录
    //   }
    // });
  },
  methods: {
    handleAgree() {
      this.isChecked = !this.isChecked;
    },

    handleToLogin(type) {
      switch (type) {
        case 1:
          // 手机号登录
          this.$emit("changeThirdAccountInfo", {});
          this.$root.$emit("changeLoginMethod", 1);
          break;
        case 4:
          // 苹果账号授权登录
          break;
        case 5:
          // Facebook授权登录
          this.tryFacebookRequest(type);
          break;
        case 6:
          this.tryGoogleRequest(type);
          // 谷歌授权登录
          break;
        default:
          break;
      }
    },

    commonLogin(type) {
      this.$api
        .commonLogin({
          type,
          openID: this.openId,
          accessToken: this.accessToken,
        })
        .then((res) => {
          console.log(res);
          if (res.result) {
            this.$store.commit("user/SET_LOGIN_INFO", res.data);
            if (res.data.isEdit) {
              // 直接进入
              console.log("直接进入===");
              const id = res.data.userInfo.id;
              const name = res.data.userInfo.nickname;
              sessionStorage.setItem("User", JSON.stringify({ name, id }));
              sessionStorage.setItem("userToken", res.data.userInfo.token);
              this.$router.push({ path: "/Chats" });
              this.$store.dispatch("permission/generateRoutes", []);
            } else {
              // 去编辑资料
              const id = res.data.userInfo.id;
              const name = res.data.userInfo.nickname;
              sessionStorage.setItem("User", JSON.stringify({ name, id }));
              sessionStorage.setItem("userToken", res.data.userInfo.token);
              this.$root.$emit("changeLoginMethod", 2);
            }
          }
        });
    },

    async tryFacebookRequest(type) {
      await FB.init({
        appId: this.app_id,
        cookie: true,
        xfbml: true,
        version: "v10.0",
      });
      FB.login(
        (response) => {
          this.openId = response.authResponse && response.authResponse.userID;
          this.accessToken =
            response.authResponse && response.authResponse.accessToken;

          FB.api("/me", { fields: "id,name,email,picture" }, (res) => {
            // 处理获取用户信息的逻辑
            const userinfo = {
              nickname: res.name,
              avatar: res.picture.data.url,
            };
            this.commonLogin(type);
            this.$emit("changeThirdAccountInfo", userinfo);
          });
        },
        { scope: "public_profile,email" }
      );
    },

    getGoogleUserinfo(access_token) {
      const xhr = new XMLHttpRequest();
      xhr.open(
        "GET",
        `https://www.googleapis.com/drive/v3/about?fields=user&access_token=${access_token}`
      );
      xhr.onreadystatechange = (e) => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          const res = JSON.parse(xhr.response);
          console.log(res, "google=====");
          this.openId = res.user.permissionId;
          console.log(this.openId, "openId===");
          this.$emit("changeThirdAccountInfo", {
            nickname: res.user.displayName,
            avatar: res.user.photoLink,
          });
        } else if (xhr.readyState === 4 && xhr.status === 401) {
          // Token invalid, so prompt for user permission.
          this.oauth2SignIn();
        }
      };
      xhr.send(null);
    },

    tryGoogleRequest(type = 0) {
      const params = this.parseHash(location.hash.substring(1));
      if (params && params["access_token"]) {
        this.accessToken = params.access_token;
        var decodeIdToken;
        params.id_token && (decodeIdToken = jwt.decode(params.id_token));
        this.openId = decodeIdToken.sub;
        this.$emit("changeThirdAccountInfo", {
          nickname: decodeIdToken.name,
          avatar: decodeIdToken.picture,
        });
        this.commonLogin(6);
      } else {
        type == 6 && this.oauth2SignIn();
      }
    },

    oauth2SignIn() {
      const oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";
      const form = document.createElement("form");
      form.setAttribute("method", "GET");
      form.setAttribute("action", oauth2Endpoint);

      const params = {
        client_id: this.client_id,
        redirect_uri: this.redirect_uri,
        nonce: "saer234",
        scope: "https://www.googleapis.com/auth/drive.metadata.readonly",
        // scope: "https://www.googleapis.com/auth/plus.login",
        state: "try_sample_request",
        include_granted_scopes: "true",
        response_type: "token id_token",
      };

      for (let p in params) {
        const input = document.createElement("input");
        input.setAttribute("type", "hidden");
        input.setAttribute("name", p);
        input.setAttribute("value", params[p]);
        form.appendChild(input);
      }

      document.body.appendChild(form);
      form.submit();
    },

    parseHash(hash) {
      const params = {};
      const regex = /([^&=]+)=([^&]*)/g;
      let m;
      while ((m = regex.exec(hash))) {
        params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
      }
      return params;
    },
  },
};
</script>

<style scoped lang="scss">
.login-method {
  // font-family: PingFangSC-Medium, PingFang SC;
  width: 100%;
  height: 100%;
  overflow: auto;
  scrollbar-width: none; //（仅限firefox）
  -ms-overflow-style: none; //（仅限IE 10+）

  &::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }

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
    flex-direction: column;
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

      a {
        font-family: PingFangSC-Medium;
        color: #fff;
        text-decoration: underline;
      }
    }
  }
}
</style>
