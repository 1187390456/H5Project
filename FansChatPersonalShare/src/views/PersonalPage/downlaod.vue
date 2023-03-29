<template>
  <div class="fixPos">
    <div class="container">
      <div class="c1">
        <img src="../../assets/img/logo1.jpg" alt="" />
        <div class="c1-1">FansBridge</div>
        <span class="c1-2">{{ $t("pp10") }}</span>
      </div>
      <a-button @click="OnClick" id="downloadButton" class="c2">{{
        $t("pp8")
      }}</a-button>
    </div>
    <blogger-dialong v-if="bloggerDialong" @CloseEvent="bloggerDialong = false" :url="targetUrl"></blogger-dialong>
  </div>
</template>

<script>
import BloggerDialong from '../../component/BloggerDialong.vue';
import { _isMobile, listenDownInfo, getParams, jumpUrl } from "../../utils/tools";
export default {
  components: { BloggerDialong },
  data() {
    return {
      bloggerDialong: false,
      type: '', // 0 博主 1粉丝 2路人

      targetUrl: ''
    }
  },
  created() {
    this.type = sessionStorage.getItem('type');
    listenDownInfo(this.type, this.$listenObj);
  },
  methods: {
    OnClick() {
      if (_isMobile()) {
        this.MobHandler();
      }
      else {
        this.PCHandler();
      }
    },
    // pc
    PCHandler() {
      // 博主
      if (this.type == 0) {
        console.log('pc端的博主啊');
        //TODO 二维码是 博主身份进入下载页面
        this.targetUrl = `${jumpUrl}` + 'invite'
        this.bloggerDialong = true
      }
      else if (this.type == 1) {
        console.log('pc端的粉丝啊');
        //TODO 二维码是 粉丝身份进入下载页面
        var u = getParams().u;
        this.targetUrl = `${jumpUrl}` + `${u}-1`
        this.bloggerDialong = true
      }
      else {
        console.log('pc端的路人啊');
        //TODO 二维码是 路人身份进入下载页面
        this.targetUrl = `${jumpUrl}` + '1-2'
        this.bloggerDialong = true
      }
    },
    // 移动
    MobHandler() {
      console.log('移动端跳转type是', this.type);
      this.$listenObj.type = true; // 直接触发 自动根据type判断
    },
  },
};
</script>
<style lang="less" scoped>
.fixPos {
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #003b62;
}

.container {
  width: 375px;
  height: 100vh;
  background: url("../../assets/img/downLoadBg.png") no-repeat;
  background-size: 100% 100vh;
  display: flex;
  justify-content: center;

  .c1 {
    margin-top: 2.55rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 4.5rem;
      height: 4.5rem;
      border-radius: 1rem;
    }

    .c1-1 {
      font-size: 1.5rem;
      font-family: STHeitiSC-Medium, STHeitiSC;
      font-weight: 500;
      color: #ffffff;
      line-height: 1.55rem;
      margin: 0.8rem 0 1.4rem 0;
    }

    .c1-2 {
      font-size: 0.7rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 1rem;
      opacity: 0.6;
      text-align: center;
      padding: 0 1.25rem;
    }
  }

  .c2 {
    position: fixed;
    bottom: 3.5rem;
    width: 11.95rem;
    height: 2.4rem;
    background: #8032ff;
    border-radius: 0.2rem;
    border: none;
    font-size: 0.8rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    line-height: 1.1rem;
  }
}
</style>