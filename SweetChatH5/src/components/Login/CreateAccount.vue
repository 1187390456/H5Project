<template>
  <div>
    <common-header :type="type"></common-header>
    <div class="container">
      <ul>
        <li class="avatar-box" @click="toUploadAvatar">
          <!-- capture="camera" -->
          <input
            type="file"
            name=""
            accept="image/*"
            ref="inputFile"
            @change="onChangeAvatar"
          />
          <div class="avatar-not-empty" v-if="uploadAvatar || thirdAccountInfo">
            <img :src="uploadAvatar || thirdAccountInfo.avatar" alt="" />
            <div><p>Re-upload</p></div>
          </div>
          <div class="avatar-empty" v-else>
            <img src="../../assets/images/login/upload_img@3x.png" alt="" />
            <p>Upload avatar</p>
          </div>
        </li>
        <li class="gender-box">
          <p :class="{ 'fill-in-content': accountForm.gender }">
            Select your gender
          </p>
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
          <p :class="{ 'fill-in-content': accountForm.nickname }">Nickname</p>
          <div>
            <input
              v-model="accountForm.nickname"
              type="text"
              placeholder="enter a nickname"
              maxlength="16"
            />
          </div>
        </li>
        <li class="birth-box" @click="hancleBirthClick">
          <p :class="{ 'fill-in-content': accountForm.birth }">Date of birth</p>
          <div>
            <p
              class="birth-content"
              :style="{ color: accountForm.birth ? '#fff' : '' }"
            >
              {{
                accountForm.birth
                  ? accountForm.birth
                  : "please choose your birth"
              }}
            </p>
            <img src="../../assets/images/login/get_into@3x.png" alt="" />
          </div>
        </li>
      </ul>
      <div class="btn-box">
        <p :class="{ 'sign-up': isSignUp }" @click="signUp">Sign Up</p>
      </div>
    </div>
    <van-popup v-model="showBirthPopup" round position="bottom">
      <van-picker
        ref="birthPicker"
        show-toolbar
        title="Select Date"
        :columns="birthColumns"
        confirm-button-text="Confirm"
        cancel-button-text="Cancel"
        @change="onChangeBirth"
        @cancel="showBirthPopup = false"
        @confirm="onConfirmBirth"
      />
    </van-popup>
    <van-popup
      v-model="showCropper"
      position="bottom"
      :close-on-click-overlay="false"
      :style="{ height: '100%' }"
    >
      <div class="crop-options">
        <div class="title">
          <van-icon name="cross" @click="cancleCropper" />
          <p>Move and scale</p>
          <van-icon name="success" @click="submitCropper" />
        </div>
        <div class="crop-outer">
          <crop-picture
            ref="cropComp"
            v-if="showCropper"
            :imgData="imgData"
          ></crop-picture>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import CommonHeader from "./CommonHeader.vue";
import CropPicture from "./CropPicture.vue";
import { initOss, ossUpload } from "@/utils/aliyunoss.js";
import { regFormatDate, daysInMonth } from "../../utils/date";
import { getImageFileFromUrl } from "../../utils/ymt";
import { mapGetters } from "vuex";

export default {
  name: "",
  mixins: [],
  components: {
    CommonHeader,
    CropPicture,
  },
  props: {
    thirdAccountInfo: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      type: 3,
      showAavatarUrl: "",
      accountForm: {
        avatar: "",
        gender: "",
        nickname: "",
        birth: "",
      },
      uploadAvatar: "",
      isSignUp: false,
      showCropper: false,
      imgData: "",
      showBirthPopup: false,
    };
  },
  computed: {
    ...mapGetters(["loginInfo"]),
    todayArr() {
      let formatStr = regFormatDate(new Date(), "YYYY-MM-DD");
      let todayArr = formatStr.split("-");
      todayArr = todayArr.map((item) =>
        item.charAt(0) == "0" ? Number(item.slice(1)) : Number(item)
      );
      return todayArr;
    },

    yearArr() {
      let yearArr = [];
      for (let i = 1923; i <= this.todayArr[0]; i++) {
        yearArr.push({ value: i, label: i, children: [] });
      }
      return yearArr;
    },

    monthArr() {
      return (year) => {
        let monthArr = [];
        let month = year == this.todayArr[0] ? this.todayArr[1] : 12;
        for (let j = 1; j <= month; j++) {
          monthArr.push({ value: j, label: j, children: [] });
        }
        return monthArr;
      };
    },

    dayArr() {
      return ([year, month]) => {
        let dayArr = [];
        let days = daysInMonth(year, month);
        days =
          year == this.todayArr[0] && month == this.todayArr[1]
            ? this.todayArr[2]
            : days;
        for (let k = 1; k <= days; k++) {
          dayArr.push({ value: k, label: k, leaf: true });
        }
        return dayArr;
      };
    },

    birthColumns() {
      let yearArr = [];
      for (let i = 1923; i <= this.todayArr[0]; i++) {
        let monthArr = [];
        let month = i == this.todayArr[0] ? this.todayArr[1] : 12;
        for (let j = 1; j <= month; j++) {
          let dayArr = [];
          let days = daysInMonth(i, j);
          days =
            i == this.todayArr[0] && j == this.todayArr[1]
              ? this.todayArr[2]
              : days;
          for (let k = 1; k <= days; k++) {
            dayArr.push({ id: k, text: k > 9 ? "" + k : "0" + k, leaf: true });
          }
          monthArr.push({
            id: j,
            text: j > 9 ? "" + j : "0" + j,
            children: dayArr,
          });
        }
        yearArr.push({ id: i, text: i, children: monthArr });
      }
      return yearArr;
    },

    // computed end
  },
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
  created() {
    initOss();
  },
  mounted() {
    if (this.isIOS()) {
      console.log("IOS ===");
      // this.$refs.inputFile.removeAttribute("capture");
    }
    console.log(this.thirdAccountInfo);
    if (this.thirdAccountInfo) {
      this.accountForm.nickname = this.thirdAccountInfo.nickname;
      this.showAavatarUrl = this.thirdAccountInfo.avatar;
      getImageFileFromUrl(this.thirdAccountInfo.avatar, "fileName")
        .then((response) => {
          // 返回的是文件对象，使用变量接收即可
          setTimeout(() => {
            ossUpload(response, {
              fileType: 1,
              fileSort: "avatar",
            }).then((res) => {
              if (res.result) {
                this.accountForm.avatar = res.data.fileID;
              } else {
              }
            });
          }, 1000);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  },
  methods: {
    signUp() {
      if (this.isSignUp) {
        this.$api
          .registerEditInfo({
            nickname: this.accountForm.nickname,
            gender: parseInt(this.accountForm.gender),
            birthday: this.accountForm.birth.replace(/\//g, "-"),
            avatarID: this.accountForm.avatar,
          })
          .then((res) => {
            console.log(res);
            if (res.result) {
              let temoObj = {
                isNew: this.loginInfo.isNew,
                isEdit: this.loginInfo.isEdit,
                ...this.loginInfo.userInfo,
                ...res.data,
              };
              this.$store.commit("user/SET_LOGIN_INFO", temoObj);
              const id = res.data.userInfo.id;
              const name = res.data.userInfo.nickname;
              sessionStorage.setItem("User", JSON.stringify({ name, id }));
              this.$router.push({ path: "/Discover" });
              this.$store.dispatch("permission/generateRoutes", []);
            }
          });
      }
    },

    hancleBirthClick() {
      this.showBirthPopup = true;
      setTimeout(() => {
        this.$refs.birthPicker.setIndexes([77, 0, 0]);
      }, 0);
    },

    onChangeBirth(picker, values, index) {
      // console.log(picker, values, index);
      // let month = values[1].charAt(0) == 0 ? values[1].substring(1) : values[1];
      // let day = values[2].charAt(0) == 0 ? values[2].substring(1) : values[1];
    },

    onConfirmBirth(value, index) {
      this.accountForm.birth = value.join("/");
      this.showBirthPopup = false;
    },

    changeShowCropper(flag) {
      this.showCropper = flag;
    },

    changeUploadAvatar(imgData) {
      this.uploadAvatar = imgData;
    },

    onChangeAvatar() {
      const file = this.$refs.inputFile.files[0];
      console.log(file, file.name, "选择的图片===");
      const isFile = /\.jpg|png|jpeg$/i.test(file.name);
      if (!isFile) {
        console.log("文件需要为jpg或png或jpeg格式!");
        this.$message.error("文件需要为jpg或png或jpeg格式!");
        return isFile;
      }
      //  readAsDataURL 方法会读取指定的 Blob 或 File 对象。
      //   读取操作完成的时候，readyState 会变成已完成DONE，
      //   并触发 loadend 事件，同时 result 属性将包含一个data:URL格式的字符串（base64编码）
      //   以表示所读取文件的内容。
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let dataURL = reader.result;
        this.imgData = dataURL;
        this.showCropper = true;
        // file-input  如果选择了同一个文件不会触发change事件
        // 解决办法就是每次使用完毕，把它的value清空
        this.$refs.inputFile.value = "";
      };
    },

    submitCropper() {
      let canvas = this.$refs.cropComp.cropper.getCroppedCanvas();
      let base64 = canvas.toDataURL("image/jpeg");
      const nfile = this.base64ToFile(base64, "avatar.png");
      this.changeUploadAvatar(base64);
      this.showCropper = false;
      ossUpload(nfile, {
        fileType: 1,
        fileSort: "avatar",
      }).then((res) => {
        if (res.result) {
          this.accountForm.avatar = res.data.fileID;
        } else {
        }
      });
    },

    cancleCropper() {
      this.showCropper = false;
    },

    toUploadAvatar() {
      this.$refs.inputFile.click();
    },

    base64ToFile(dataurl, fileName) {
      // global atob Uint8Array File
      let arr = dataurl.split(",");
      let imgType = arr[0].match(/:(.*?);/)[1];
      let bstr = atob(arr[1]);
      let n = bstr.length;
      let u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], fileName, { type: imgType });
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

      .fill-in-content {
        color: rgba(255, 255, 255, 0.5);
      }
    }

    .avatar-box {
      width: 5.333333rem /* 100/18.75 */;
      height: 5.333333rem /* 100/18.75 */;
      text-align: center;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50px;
      overflow: hidden;

      input[type="file"] {
        display: none;
      }

      .avatar-base {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .avatar-empty {
        @extend .avatar-base;

        img {
          width: 1.386667rem /* 26/18.75 */;
          height: 1.386667rem /* 26/18.75 */;
        }

        p {
          font-size: 0.64rem /* 12/18.75 */;
        }
      }

      .avatar-not-empty {
        @extend .avatar-base;
        position: relative;

        img {
          width: 100%;
          height: 100%;
        }

        > div {
          width: 100%;
          height: 100%;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0.5) 100%
          );
          position: absolute;
          top: 0;

          p {
            width: 100%;
            text-align: center;
            font-size: 0.64rem /* 12/18.75 */;
            position: absolute;
            bottom: 0.8rem /* 15/18.75 */;
          }
        }
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

    .nickname-box {
      > div {
        display: flex;
        margin-top: 0.32rem /* 6/18.75 */;
      }

      input[type="text"] {
        flex: 1;
        color: #ffffff;
        font-size: 0.853333rem /* 16/18.75 */;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
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

        .birth-content {
          flex: 1;
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.853333rem /* 16/18.75 */;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          padding-bottom: 0.32rem /* 6/18.75 */;
          border-bottom: 1px solid rgba(197, 197, 209, 0.2);
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
.crop-options {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: #000;

  .title {
    height: 2.346667rem /* 44/18.75 */;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.533333rem /* 10/18.75 */;
  }

  .crop-outer {
    flex: 1;
    width: 100vw;
    position: relative;
  }
}
</style>
