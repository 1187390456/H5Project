<template>
  <el-container style="font-family: PingFangSC-Medium, PingFang SC;">
    <el-header> <navbar /> </el-header>
    <el-main class="el-main">
      <app-main />
    </el-main>
    <el-footer ><sidebar /></el-footer>
    <!-- <el-footer ><app-footer /></el-footer> -->
  </el-container>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
export default {
  name: 'Layout',
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
