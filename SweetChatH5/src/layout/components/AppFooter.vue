<template>
  <div class="app-footer">
   <ul>
    
        <li         
        v-for="route in routes"
        :key="route.path"
        :item="route"
        :base-path="route.path">
          <app-link :to="resolvePath(route.path)">
            <div><img src="@/assets/layout/chats.png" alt=""></div>
            <div>{{route.children[0].name}}</div>
          </app-link>
        </li>
    </ul>
  </div>
</template>

<script>
import { isExternal } from "@/utils/validate";
import path from "path";
import AppLink from "./Link";

export default {
  data() {
    return {

    }
  },
  components: {
    AppLink,
  },
  computed:{
    routes() {
      var routers = this.$store.state.permission.routes
      console.log(routers.filter((item)=>!item.hidden),"++++++++");
      return routers.filter((item)=>!item.hidden)
    },
  },
  methods:{
      resolvePath(routePath) {
        if (isExternal(routePath)) {
          return routePath;
        }
        if (isExternal(this.basePath)) {
          return this.basePath;
        }
        return path.resolve(this.basePath, routePath);
      },
  }
}
</script>

<style scoped lang="scss">
.app-footer{
    height: 3.3067rem !important;
    padding: 0;
    font-family: PingFangSC-Medium, PingFang SC;
    line-height: 3.3067rem;
}
ul,li{
    padding: 0;
    margin: 0;
    list-style: none;
}
ul{
  height: 100%;
  display: flex;
  justify-content:space-around;
  align-items: center;
  li{
    font-size: .5333rem;
    color: #A4AAB2;
    line-height: .7467rem;
    text-align: center;
  }
  img{
    width: 1.2267rem;
    height: 1.2267rem;    
  }
  .active{
    color: #8032FF;
  }
}
</style>
