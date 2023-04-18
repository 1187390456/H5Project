import Vue from "vue";
import "@babel/polyfill";
import "normalize.css/normalize.css"; // A modern alternative to CSS resets
// import 'blob-polyfill'
// import './lib/blob'
import ElementUI from "element-ui";
// import 'element-ui/lib/theme-chalk/index.css'
import "swiper/dist/css/swiper.css";
import locale from "element-ui/lib/locale/lang/zh-CN"; // lang i18n

import App from "./App";
import store from "./store";
import router from "./router";
import Bus from "./bus";
import "./directive";
import { Api } from "./api_v2";

import vConsole from "./vconsole";

// 视频播放组件
import VideoPlayer from "vue-video-player";
require("video.js/dist/video-js.css");
require("vue-video-player/src/custom-theme.css");
Vue.use(VideoPlayer);

import "@/icons"; // 图标
import "@/permission"; // 权限控制
import * as filters from "./filter";
import { VueMaskDirective } from "v-mask";
Vue.directive("mask", VueMaskDirective);
import Viewer from "v-viewer";
import "viewerjs/dist/viewer.css";
import "./assets/font/index.css";
import "./assets/style/xcm.css";
import "./assets/style/xcm.less";

import "vant/lib/index.css";
import { Icon, Picker, Popup, Overlay, PullRefresh,Uploader  } from "vant";
Vue.use(Icon);
Vue.use(Picker);
Vue.use(Popup);
Vue.use(Overlay);
Vue.use(PullRefresh);
Vue.use(Uploader);

// ant
// import "ant-design-vue/dist/antd.css";
// import Antd from "ant-design-vue";

var env = process.env.NODE_ENV || "development";
Vue.use(Viewer);
Viewer.setDefaults({
  Options: {
    inline: true,
    button: true,
    navbar: true,
    title: true,
    toolbar: true,
    tooltip: true,
    movable: true,
    zoomable: true,
    rotatable: true,
    scalable: true,
    transition: true,
    fullscreen: true,
    keyboard: true,
    url: "data-source",
  },
});
import VueLazyload from "vue-lazyload";
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require("assets/error.png"),
  loading: require("assets/timg.gif"),
  attempt: 3,
});
Vue.use(Api);
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});
Vue.use(ElementUI, { locale, size: "medium" });
// Vue.use(Antd);
// Vue.use(Vue2OrgTree)
Vue.config.productionTip = false;
Vue.prototype.$bus = Bus;

// 开启debug模式
Vue.config.debug = true;
window.vm = new Vue({
  store,
  router,
  el: "#app",
  render: (h) => h(App),
});

export default Vue;
