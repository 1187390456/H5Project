<!--
 * @Page: 
 * @Version: 1.0.0
 * @Autor: xumeng
 * @Date: 2021-09-01 15:50:59
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-04 15:23:11
-->
<template>
  <div v-if="!item.hidden" class="menu-wrapper">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      "
    >
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :disabled="item.disabled"
          class="menu-item"
        >
          <div>
            <div><img :src="require(`@/assets/layout/${onlyOneChild.path == activePath ? 're'+onlyOneChild.meta.icon :onlyOneChild.meta.icon}`)" alt=""></div>
            <div class="title">{{onlyOneChild.name}}</div>
          </div>
        </el-menu-item>
      </app-link>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import path from "path";
import { isExternal } from "@/utils/validate";
import AppLink from "./Link";
import FixiOSBug from "./FixiOSBug";
export default {
  name: "SidebarItem",
  components: { AppLink },
  computed: {    
  },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true,
    },
    isNest: {
      type: Boolean,
      default: false,
    },
    basePath: {
      type: String,
      default: "",
    },
    activePath:{
      type: String,
      default: "",
    }
  },
  data() {
    this.onlyOneChild = null;
    return {
    };
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter((item) => {
        if (item.hidden) {
          return false;
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item;
          return true;
        }
      });

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true;
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: "", noShowingChildren: true };
        return true;
      }

      return false;
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(this.basePath)) {
        return this.basePath;
      }
      return path.resolve(this.basePath, routePath);
    },
  },
};
</script>
<style scoped lang="scss">
.menu-item{
  font-size: .5333rem;
  color: #A4AAB2;
  // line-height: .7467rem;
  text-align: center;
  img{
    width: 1.2267rem;
    height: 1.2267rem;    
  }
  .title{
    height: .7467rem;
    line-height: .7467rem;
  }
  .active{
    color: #8032FF;
  }
}
::v-deep .is-active{
  color: #8032FF;
}
</style>

