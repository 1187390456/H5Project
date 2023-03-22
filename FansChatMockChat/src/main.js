import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./locale";
import axios from "axios";

// import vConsole from "./vconsole";

// // ant
// import "ant-design-vue/dist/antd.css";
// import { Button, Card, Spin, message } from "ant-design-vue";

import locale from "element-ui/lib/locale/lang/zh-CN"; // lang i18n
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

// global
import "../src/assets/style/global.css";
import "./assets/styleX/xcm.css";
import "./assets/styleX/xcm.less";

// tools
import { formatMsgTime } from "./utils/date";
import { listenObj } from "./utils/tools";

Vue.config.productionTip = false;

// 自定义指令
Vue.prototype.$format = formatMsgTime;
Vue.prototype.$listenObj = listenObj;

Vue.use(ElementUI, { locale, size: "medium" });

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
