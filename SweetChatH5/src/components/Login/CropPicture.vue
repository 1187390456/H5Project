<template>
  <!-- 剪裁图片组件 -->
  <van-popup
    class="bg-tran"
    v-model="showCropper"
    closeable
    position="top"
    :style="{ height: '100%' }"
  >
    <div class="flex-column-center height100">
      <vue-cropper
        ref="cropper"
        :img="option.img"
        :outputSize="option.outputSize"
        :outputType="option.outputType"
        :info="option.info"
        :full="option.full"
        :autoCropWidth="option.autoCropWidth"
        :autoCropHeight="option.autoCropHeight"
        :canMove="option.canMove"
        :canMoveBox="option.canMoveBox"
        :original="option.original"
        :autoCrop="option.autoCrop"
        :fixed="option.fixed"
        :fixedNumber="option.fixedNumber"
        :centerBox="option.centerBox"
        :infoTrue="option.infoTrue"
        :fixedBox="option.fixedBox"
        :high="option.high"
        :mode="option.mode"
      ></vue-cropper>
      <!-- <van-col span="24" class="font14 col-white">
        <van-col span="8" class="p-2"
          ><span @click="cancelCropper">取消</span></van-col
        >
        <van-col span="8" class="p-2 text-center"
          ><span @click="rotateImage" class="font18"
            ><van-icon name="replay" /></span
        ></van-col>
        <van-col span="8" class="p-2 text-right"
          ><span @click="getCropBlob">确定</span></van-col
        >
      </van-col> -->
    </div>
  </van-popup>
</template>

<script>
import { VueCropper } from "vue-cropper";

export default {
  name: "",
  mixins: [],
  components: { VueCropper },
  props: {
    showCropper: {
      type: Boolean,
    },
    imgData: {
      type: [Blob, Object],
    },
  },
  data() {
    return {
      option: {
        img: "",
        outputSize: 0.8,
        info: false, // 裁剪框的大小信息
        outputType: "png", // 裁剪生成图片的格式
        canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: window.innerWidth - 100 + "px", // 默认生成截图框宽度
        autoCropHeight: window.innerWidth - 100 + "px", // 默认生成截图框高度
        high: true, // 是否按照设备的dpr 输出等比例图片
        fixedBox: true, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [1, 1], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: false, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        infoTrue: false, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
        mode: "100% auto", // 图片默认渲染方式
      },
    };
  },
  computed: {},
  watch: {
    showCropper(newVal) {
      if (newVal) {
        this.imageToBase64(this.imgData);
      }
    },
  },
  created() {},
  mounted() {},
  methods: {
    // 将本地图片转化为Base64，否则vue-cropper组件显示不出要本地需要剪裁的图片
    imageToBase64(file) {
      let reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = () => {
        // 截图框中的图片
        this.option.img = reader.result;
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    },

    // 确认剪裁并上传图片
    getCropBlob() {
      this.$comMethods.toast("上传中", 0);
      let formData = new FormData();
      this.$refs.cropper.getCropBlob((data) => {
        formData.append("avatar", data, this.imageFileName);
        // formData私有类对象，访问不到，可以通过get判断值是否传进去
        console.log(formData.get("avatar"));
        // 上传图片至服务器
        this.$api
          .modifyProfile(formData)
          .then((res) => {
            if (res.code === 200) {
              this.$toast("更改头像成功");
              // do something...
            } else {
              this.$toast("上传失败");
            }
          })
          .catch((err) => console.error(err));
      });
    },

    // 旋转图片
    rotateImage() {
      this.$refs.cropper.rotateRight();
    },

    // 取消截图上传头像
    cancelCropper() {
      this.showCropper = false; // 隐藏切图遮罩
      this.showPopup = true;
    },
  },
};
</script>

<style scoped lang="scss"></style>
