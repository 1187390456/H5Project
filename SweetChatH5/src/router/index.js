import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

let panUrl, packageMode;

if (process.env.VUE_APP_MODE === "dev") {
  packageMode = "hash";
  panUrl =
    "http://activity.timing360.com/MonkeyLightUpload/TestReleased/pageIndex.html";
} else if (process.env.VUE_APP_MODE === "test") {
  // 测试环境
  packageMode = "hash";
  panUrl =
    "http://activity.timing360.com/MonkeyLightUpload/TestReleased/pageIndex.html";
} else if (process.env.VUE_APP_MODE === "stage") {
  // 灰度环境
  packageMode = "hash";
  panUrl =
    "http://activity.timing360.com/MonkeyLightUpload/GrayReleased/pageIndex.html";
} else if (process.env.VUE_APP_MODE === "release") {
  // 正式环境
  packageMode = "history";
  panUrl =
    "http://activity.timing360.com/MonkeyLightUpload/FormalReleased/pageIndex.html";
}
/**
 *
 * hidden: true                   //当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面(默认为true)
 * alwaysShow: true               //当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                //只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                //若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                //你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 *
 * redirect: noRedirect           //当设置 noredirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'             //设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
    roles: ['admin','editor']    //设置该路由进入的权限，支持多个权限叠加
    title: 'title'               //设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'             //设置该路由的图标
    breadcrumb: false            //如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    activeMenu: '/example/list'  //如果设置为false，则不会在breadcrumb面包屑中显示
  }
 */

/**
 * constantRoutes
 * 没有权限要求的基页
 * 可以访问所有角色
 */
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/Login/index"),
    hidden: true,
    breadcrumb: true,
    meta: { title: "登录", keepAlive: false },
  },
  {
    path: "/Chats",
    component: Layout,
    redirect: "/Chats",
    children: [
      {
        path: "/Chats",
        name: "Chats",
        component: () => import("views/Chats/index"),
        meta: {
          icon: "chats.png",
        },
      },
    ],
  },
  {
    path: "/",
    component: Layout,
    redirect: "/Discover",
    children: [
      {
        path: "/Discover",
        name: "Discover",
        component: () => import("views/Discover/index"),
        meta: {
          icon: "discover.png",
        },
      },
    ],
  },
  {
    path: "/Posts",
    component: Layout,
    children: [
      {
        path: "/Posts",
        name: "Posts",
        component: () => import("views/Posts/index"),
        meta: {
          icon: "posts.png",
        },
      },
    ],
  },
];

export const asyncRoutes = [{ path: "/*", redirect: "/", hidden: true }];

const createRouter = () =>
  new Router({
    // mode: packageMode, // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes || [],
  });

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
