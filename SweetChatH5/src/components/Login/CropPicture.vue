<template>
  <div class="cropper-box">
    <!-- 剪裁图片组件 -->
    <div class="crop-box">
      <img id="cropImage" :src="imgData" alt="" />
    </div>
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
    this.imgData && this.initCropper();
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

    // methods end
  },
};
</script>

<style scoped lang="scss">
.cropper-box {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  .crop-box {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
