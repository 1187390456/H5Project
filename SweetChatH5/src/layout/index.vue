<template>
  <el-container style="font-family: PingFangSC-Medium, PingFang SC;">
    <el-header> <navbar /> </el-header>
    <el-main class="el-main" :style="{'--InnerHeight':innerHeight+'px'}">
      <app-main />
    </el-main>
    <el-footer><sidebar /></el-footer>
  </el-container>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
export default {
  name: 'Layout',
  data(){
    return {
      isClass:"",
      innerHeight:0
    }
  },
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  // mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
  },
  mounted(){
    this.isAndroidOrIOS()
    this.innerHeight = window.innerHeight
    console.log(window.innerHeight,Window.height);
  },
  methods: {
    isAndroidOrIOS() {
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isAndroid) {
            this.isClass = "android"
            console.log("android>>>>");            
            return this.isClass 
        }
        if (isiOS) {
            console.log("ios>>>>");            
            this.isClass = "ios"
            return this.isClass 
        }
        
        return false
    }            
  }
}
</script>

<style lang="scss" scoped>
// @import '~@/styles/mixin.scss';
// @import '~@/styles/variables.scss';
.el-main{
  height: calc(var(--InnerHeight) - 62.0006px - 51.9994px );
  overflow: auto;
}
// .el-main1{
//   height: calc(100vh - 3.3067rem - 2.7733rem - 10.6667rem);
//   overflow: auto;
// }
::v-deep .el-header{
  height: 2.7733rem !important;
}
::v-deep .el-footer{
  padding: 0 !important;
  height: 3.3067rem !important;
  background-color: #fff;
  width: 100%;
  position: fixed;
  bottom: 0;
}
::-webkit-scrollbar {
	width: 0px;
}
</style>
