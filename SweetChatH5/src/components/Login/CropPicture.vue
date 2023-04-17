<template>
  <div class="cropper-box">
    <!-- 剪裁图片组件 -->
    <van-popup
      v-model="showCropper"
      position="top"
      duration="0"
      :style="{ height: '100%' }"
    >
      <div class="crop-options">
        <div class="title">
          <van-icon name="cross" @click="cancleCropper" />
          <p>Move and scale</p>
          <van-icon name="success" @click="submitCropper" />
        </div>
        <div class="crop-box">
          <img id="cropImage" :src="imgData" alt="" />
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";

export default {
  name: "",
  mixins: [],
  components: {},
  props: {
    showCropper: {
      type: Boolean,
    },
    imgData: {
      type: [Blob, String],
    },
  },
  data() {
    return {
      cropper: null,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.initCropper();
  },
  methods: {
    initCropper() {
      let cropImageDom = document.querySelector("#cropImage");
      this.cropper = new Cropper(cropImageDom, {
        aspectRatio: 1, // 设置宽高比例为1:1
        autoCrop: false,
        autoCropArea: 0.5, // 0-1之间的数值，定义自动剪裁区域的大小，默认0.8
        background: false,
        viewMode: 1, // 裁切模式，裁剪框可移动缩放，但不能超出图片范围
        guides: false, //是否在剪裁框上显示虚线。
        dragCrop: true, //是否允许移除当前的剪裁框，并通过拖动来新建一个剪裁框区域。
        autoCropArea: 0.2,
        movable: true, //是否允许移动裁剪框
        resizable: true, //是否允许改变剪裁框的大小。
        zoomable: true, //是否允许放大缩小底部图片。
        minCropBoxWidth: 100, //设置最小裁切框宽度
        minCropBoxHeight: 100, //设置最小裁切框高度
        ready: () => {
          this.cropper.crop();
        },
        cropend: (res) => {
          console.log(res, "裁切完成");
        },
      });
    },

    submitCropper() {
      let canvas = this.cropper.getCroppedCanvas();
      let base64 = canvas.toDataURL("image/jpeg");
      const nfile = this.base64ToFile(base64, "avatar.png");
      this.$emit("changeUploadAvatar", base64);
      this.$emit("changeShowCropper", false);
    },

    cancleCropper() {
      this.$emit("changeShowCropper", false);
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
.cropper-box {
  .van-popup {
    background: #141313;
  }

  .crop-options {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .title {
      height: 2.346667rem /* 44/18.75 */;
      color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.533333rem /* 10/18.75 */;
    }

    .crop-box {
      flex: 1;
      width: 100vw;
      overflow: hidden;
    }
  }
}
</style>
