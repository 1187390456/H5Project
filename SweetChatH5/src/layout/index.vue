<template>
  <el-container style="background:#F6F7FB">
    <el-header>
      <navbar />
    </el-header>
    <el-main >
      <el-container style="width:100%;min-width:1080px; margin:0 auto;padding:0px">
        <el-aside style="background-color:#fff;width:180px;border:none">
          <sidebar class="sidebar-container"  />
        </el-aside>
        <el-main style="padding: 0 40px 0 0;">
          <app-main />
        </el-main>
      </el-container>
    </el-main>
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
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #333;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 64px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
