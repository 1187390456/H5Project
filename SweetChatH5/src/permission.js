/*
 * @Page:
 * @Version: 1.0.0
 * @Autor: xumeng
 * @Date: 2020-03-31 10:55:22
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-09-07 15:17:20
 */
import router from "./router";
import store from "./store";
import Nprogress from "nprogress";
import "nprogress/nprogress.css";
import getPageTitle from "utils/get-page-title";

Nprogress.configure({
  showSpinner: false,
});

const whiteList = ["/login"];
router.beforeEach((to, from, next) => {
  Nprogress.start();
  document.title = getPageTitle(to.meta.title);
  let user = JSON.parse(sessionStorage.getItem("User"));
  if (user && user.id) {
    if (to.path === "/login") {
      next("/");
    } else {
      next();
    }
  } else {
    console.log(to.path);
    // return
    if (whiteList.indexOf(to.path) !== -1) {
      // alert(1)
      next();
    } else {
      console.log(1111111);
      next(`/login?redirect=${to.path}`); // 否则全部重定向到登录页
    }
  }
});

router.afterEach(() => {
  Nprogress.done();
});
