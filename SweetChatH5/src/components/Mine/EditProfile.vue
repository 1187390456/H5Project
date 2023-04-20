<template>
  <div class="edit-profile">
    <common-header>
      <template #title>Edit profile</template>
    </common-header>

    <div class="main">
      <dl>
        <dt>Personal information</dt>
        <dd
          v-for="(item, index) in basicInfoArr"
          :key="index"
          @click="toEdit(item)"
        >
          <span class="line-title">{{ item.title }}</span>
          <p
            :class="{
              'line-content': true,
              'no-cursor': item.type === 'country' || item.type === 'gender',
            }"
          >
            <img v-show="item.imageUrl" :src="item.imageUrl" alt="" />
            {{ item | contentFilter }}
            <img
              v-if="!(item.type === 'country' || item.type === 'gender')"
              class="right-img"
              src="../../assets/images/mine/right.png"
              alt=""
            />
          </p>
        </dd>
        <dt>Self-introduction</dt>
        <dd class="self-intro">
          <div>
            <p>Who are you expecting for?</p>
          </div>
          <img src="../../assets/images/mine/right.png" alt="" />
        </dd>
      </dl>

      <input
        style="display: none"
        type="file"
        name=""
        accept="image/*"
        ref="inputFile"
        @change="onChangeAvatar"
      />
    </div>

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
import { regFormatDate } from "../../utils/date";

export default {
  name: "",
  mixins: [],
  components: { CommonHeader },
  props: {},
  data() {
    return {
      // 基础信息
      basicInfoArr: [
        {
          type: "avatar",
          title: "Avatar",
          imageUrl: "",
          content: "",
        },
        {
          type: "nickname",
          title: "Nickname",
          imageUrl: "",
          content: "",
        },
        {
          type: "gender",
          title: "Gender",
          imageUrl: "",
          content: "",
        },
        {
          type: "birthday",
          title: "Birth",
          imageUrl: "",
          content: "",
        },
        {
          type: "country",
          title: "Country",
          imageUrl: "",
          content: "",
        },
        {
          type: "height",
          title: "Height",
          imageUrl: "",
          content: "",
        },
      ],
      showCropper: false,
      imgData: "",
    };
  },
  computed: {},
  filters: {
    contentFilter(val) {
      switch (val.type) {
        case "gender":
          return val.type == 1 ? "男" : "女";
        case "height":
          return val.content + "cm";
        default:
          return val.content;
      }
    },
  },
  watch: {},
  created() {},
  mounted() {
    this.getMineInfo();
  },
  methods: {
    // 获取基础信息
    async getMineInfo() {
      let res = await this.$api.mineInfo();
      if (res.result) {
        this.basicInfoArr.map((item) => {
          switch (item.type) {
            case "avatar":
              item.imageUrl = res.data.userInfo[item.type];
              break;
            case "birthday":
              item.content = regFormatDate(
                new Date(res.data.userInfo[item.type]),
                "YYYY-MM-DD"
              );
              break;
            default:
              item.content = res.data.userInfo[item.type];
              break;
          }
          return item;
        });
      } else {
        this.$message.error(res.errorMsg);
      }
    },

    toEdit(info) {
      console.log(info, "info===");
      switch (info.type) {
        case "avatar":
          break;
        default:
          break;
      }
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

    // methods end
  },
};
</script>

<style scoped lang="scss">
.edit-profile {
  .main {
    padding: 0 0.64rem /* 12/18.75 */;

    dl {
      width: 100%;
      margin: 0;

      dt {
        font-size: 0.746667rem /* 14/18.75 */;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #9896a0;
        margin-top: 0.853333rem /* 16/18.75 */;
        margin-bottom: 0.426667rem /* 8/18.75 */;
        margin-left: 0.426667rem /* 8/18.75 */;
      }

      dd {
        width: 100%;
        height: 2.88rem /* 54/18.75 */;
        background: #fefefe;
        padding: 0.853333rem /* 16/18.75 */;
        margin: 0;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;

        span {
          font-size: 0.853333rem /* 16/18.75 */;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
        }

        > p {
          display: flex;
          align-items: center;
        }

        p {
          font-size: 0.746667rem /* 14/18.75 */;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #9896a0;
          margin: 0;

          img {
            width: 1.92rem /* 36/18.75 */;
            height: 1.92rem /* 36/18.75 */;
            border-radius: 50%;
          }

          .right-img {
            width: 1.066667rem /* 20/18.75 */;
            height: 1.066667rem /* 20/18.75 */;
            margin-left: 0.426667rem /* 8/18.75 */;
          }
        }
      }

      .self-intro {
        height: 4.906667rem /* 92/18.75 */;
        border-radius: 0.64rem /* 12/18.75 */;

        > div {
          height: 100%;
        }

        img {
          width: 1.066667rem /* 20/18.75 */;
          height: 1.066667rem /* 20/18.75 */;
          margin-left: 0.426667rem /* 8/18.75 */;
        }
      }
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
