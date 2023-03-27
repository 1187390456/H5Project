import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./locale";
import axios from "axios";

// import vConsole from "./vconsole";

// ant
import "ant-design-vue/dist/antd.css";
import { Button, Card, Spin, message, Skeleton } from "ant-design-vue";

// global
import "../src/assets/style/global.css";

// tools
import { formatMsgTime } from "./utils/date";
import { listenObj } from "./utils/tools";

Vue.config.productionTip = false;

// 自定义指令
Vue.prototype.$message = message;
Vue.prototype.$format = formatMsgTime;
Vue.prototype.$listenObj = listenObj;

Vue.use(Button);
Vue.use(Card);
Vue.use(Spin);
Vue.use(Skeleton);

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
