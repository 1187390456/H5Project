<template>
  <el-menu
    class="el-menu"
    ref="menu"
    mode="horizontal"
    :default-active="activeMenu"
    :collapse="isCollapse"
    :unique-opened="false"
    :collapse-transition="false"
    @select="handleSelect"
    router
  >
    <sidebar-item
      v-for="(route, index) in routes"
      :key="index + '_' + route.path"
      :item="route"
      :base-path="route.path"
      :activePath="activePath"
    />
  </el-menu>
</template>

<script>
import { isExternal } from "@/utils/validate";
import { mapGetters } from "vuex";
import SidebarItem from "./SidebarItem";
// import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem },
  data() {
    return {
      activePath: this.$route.path,
    };
  },
  computed: {
    ...mapGetters(["sidebar"]),
    routes() {
      console.log(this.$store.state.permission.routes);
      return this.$store.state.permission.routes;
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    // variables() {
    //   return variables
    // },
    isCollapse() {
      return !this.sidebar.opened;
    },
  },
  methods: {
    handleSelect(key, keyPath) {
      this.activePath = key;
      if (isExternal(key)) {
        this.$api
          .getPanCode({})
          .then((res) => {
            if (!res.error_code) {
              window.open(`${key}?code=${res.code}`);
            } else {
              this.$message({
                type: "warning",
                message: res.error_msg,
              });
            }
          })
          .catch((res) => {
            this.$message({
              type: "error",
              message: "网盘鉴权报错",
            });
          });
      }
    },
  },
  mounted() {},
};
</script>
<style scoped>
.el-menu {
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
