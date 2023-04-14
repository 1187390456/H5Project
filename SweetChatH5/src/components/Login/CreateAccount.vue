<template>
  <div>
    <common-header :type="type"></common-header>
    <div class="container">
      <ul>
        <li class="avatar-box" @click="uploadAvatar">
          <input
            type="file"
            name=""
            accept="image/*"
            capture="camera"
            ref="inputFile"
            @change="onChangeAvatar"
          />
          <img src="../../assets/images/login/upload_img@3x.png" alt="" />
          <p>Upload avatar</p>
        </li>
        <li class="gender-box">
          <p>Select your gender</p>
          <div>
            <input
              type="radio"
              v-model="accountForm.gender"
              id="male"
              value="1"
            />
            <label for="male">
              <div
                :style="{
                  background:
                    accountForm.gender == 1
                      ? '#fff'
                      : 'rgba(255, 255, 255, 0.1)',
                }"
              >
                <img
                  v-if="accountForm.gender == 1"
                  src="../../assets/images/login/sex_man_checked@3x.png"
                  alt=""
                />
                <img
                  v-else
                  src="../../assets/images/login/sex_man@3x.png"
                  alt=""
                />
                <b
                  :style="{
                    color: accountForm.gender == 1 ? '#5094F3' : '#fff',
                  }"
                  >Male</b
                >
              </div>
            </label>
            <input
              type="radio"
              v-model="accountForm.gender"
              id="female"
              value="2"
            />
            <label for="female">
              <div
                :style="{
                  background:
                    accountForm.gender == 2
                      ? '#fff'
                      : 'rgba(255, 255, 255, 0.1)',
                }"
              >
                <img
                  v-if="accountForm.gender == 2"
                  src="../../assets/images/login/sex_woman_checked@3x.png"
                  alt=""
                />
                <img
                  v-else
                  src="../../assets/images/login/sex_woman@3x.png"
                  alt=""
                />
                <b
                  :style="{
                    color: accountForm.gender == 2 ? '#FF77B5' : '#fff',
                  }"
                  >Female</b
                >
              </div>
            </label>
          </div>
        </li>
        <li class="nickname-box">
          <p>Nickname</p>
          <div>
            <input
              v-model="accountForm.nickname"
              type="text"
              placeholder="enter a nickname"
            />
          </div>
        </li>
        <li class="birth-box">
          <p>Date of birth</p>
          <div>
            <input
              v-model="accountForm.birth"
              type="text"
              placeholder="please choose your birth"
            />
            <img src="../../assets/images/login/get_into@3x.png" alt="" />
          </div>
        </li>
      </ul>
      <div class="btn-box">
        <p :class="{ 'sign-up': isSignUp }">Sign Up</p>
      </div>
    </div>
    <!-- <crop-picture :showCropper="showCropper" :imgData="imgData"></crop-picture> -->
  </div>
</template>

<script>
import CommonHeader from "./CommonHeader.vue";
// import CropPicture from "./CropPicture.vue";
import { initOss, ossUpload } from "@/utils/aliyunoss.js";

export default {
  name: "",
  mixins: [],
  components: {
    CommonHeader,
    // CropPicture
  },
  props: {},
  data() {
    return {
      type: 3,
      accountForm: {
        avatar: "1",
        gender: "",
        nickname: "",
        birth: "",
      },
      isSignUp: false,
      showCropper: false,
      imgData: {},
    };
  },
  computed: {},
  watch: {
    accountForm: {
      handler(newVal) {
        var flag = true;
        for (let key in newVal) {
          if (!newVal[key]) {
            flag = false;
            break;
          }
        }
        this.isSignUp = flag;
      },
      deep: true,
    },
  },
  created() {},
  mounted() {
    if (this.isIOS()) {
      this.$refs.inputFile.removeAttribute("capture");
    }
  },
  methods: {
    onChangeAvatar() {
      const file = this.$refs.inputFile.files[0];
      console.log(this.$refs.inputFile.files, file, "===");
      // 获取blob数据
      const data = window.URL.createObjectURL(file);
      // 数据传递至弹出层中
      this.imgData = file;
      // 显示出弹出层
      this.showCropper = true;
      // file-input  如果选择了同一个文件不会触发change事件
      // 解决办法就是每次使用完毕，把它的value清空
      this.$refs.inputFile.value = "";
    },

    uploadAvatar() {
      // initOss();
      this.$refs.inputFile.click();
    },
    isIOS() {
      var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/iPhone\sOS/i) == "iphone os") {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  padding: 0 1.066667rem /* 20/18.75 */;
  margin-top: 1.706667rem /* 32/18.75 */;

  ul {
    li {
      margin-top: 1.28rem /* 24/18.75 */;

      p {
        margin: 0;
        font-size: 0.746667rem /* 14/18.75 */;
        font-family: PingFangSC-Medium, PingFang SC;
        color: #ffffff;
        font-weight: 500;
      }
    }

    .avatar-box {
      width: 5.333333rem /* 100/18.75 */;
      height: 5.333333rem /* 100/18.75 */;
      text-align: center;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      overflow: hidden;

      input[type="file"] {
        display: none;
      }

      img {
        width: 1.386667rem /* 26/18.75 */;
        height: 1.386667rem /* 26/18.75 */;
      }

      p {
        font-size: 0.64rem /* 12/18.75 */;
      }
    }

    .gender-box > div {
      display: flex;
      margin-top: 0.64rem /* 12/18.75 */;

      input[type="radio"] {
        display: none;
      }

      div {
        width: 8rem /* 150/18.75 */;
        height: 1.92rem /* 36/18.75 */;
        border-radius: 0.96rem /* 18/18.75 */;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 0.64rem /* 12/18.75 */;

        img {
          width: 0.64rem /* 12/18.75 */;
          height: 0.64rem /* 12/18.75 */;
        }

        b {
          font-weight: 500;
          font-size: 0.746667rem /* 14/18.75 */;
          font-family: PingFangSC-Medium, PingFang SC;
          margin-left: 0.213333rem /* 4/18.75 */;
        }
      }
    }

    .nickname-box,
    .birth-box {
      > div {
        display: flex;
        margin-top: 0.32rem /* 6/18.75 */;
        position: relative;

        img {
          width: 0.853333rem /* 16/18.75 */;
          height: 0.853333rem /* 16/18.75 */;
          position: absolute;
          right: 0;
        }
      }

      input[type="text"] {
        flex: 1;
        color: #ffffff;
        font-size: 0.853333rem /* 16/18.75 */;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 100;
        outline-style: none;
        border: 0rem;
        border-bottom: 1px solid rgba(197, 197, 209, 0.2);
        background: transparent;
        padding-bottom: 0.32rem /* 6/18.75 */;

        &::placeholder {
          color: #ffffff;
          opacity: 0.5;
        }
      }
    }
  }

  .btn-box {
    margin-top: 2.133333rem /* 40/18.75 */;

    p {
      width: 17.866667rem /* 335/18.75 */;
      height: 2.453333rem /* 46/18.75 */;
      line-height: 2.453333rem /* 46/18.75 */;
      color: #8032ff;
      background-color: #fff;
      text-align: center;
      margin: 0;
      opacity: 0.4;
      border-radius: 1.6rem /* 30/18.75 */;
    }

    .sign-up {
      opacity: 1;
    }
  }
}
</style>
