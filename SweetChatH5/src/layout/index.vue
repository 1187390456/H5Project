<template>
  <el-container style="font-family: PingFangSC-Medium, PingFang SC;">
    <el-header> <navbar /> </el-header>
    <el-main class="el-main">
      <!-- <el-container style="width:100%;min-width:1080px; margin:0 auto;padding:0px">
        <el-aside style="background-color:#fff;width:180px;border:none">
          <sidebar class="sidebar-container"  />
        </el-aside>
        <el-main style="padding: 0 40px 0 0;">
          <app-main />
        </el-main>
      </el-container> -->
      <app-main />
    </el-main>
    <el-footer ><sidebar /></el-footer>
    <!-- <el-footer ><app-footer /></el-footer> -->
  </el-container>
</template>

<script>
import { Navbar, Sidebar, AppMain,AppFooter } from './components'
export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    AppFooter
  },
  // mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      console.log(this.$store.state.app.device,"+++++++++++");
      return this.$store.state.app.device
    },
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
// @import '~@/styles/mixin.scss';
// @import '~@/styles/variables.scss';
.el-main{
  height: calc(100vh - 3.3067rem - 2.7733rem);
  overflow: auto;
}
::v-deep .el-header{
  height: 2.7733rem !important;
}
::v-deep .el-footer{
  padding: 0 !important;
  height: 3.3067rem !important;
}
::-webkit-scrollbar {
	width: 0px;
}
</style>
