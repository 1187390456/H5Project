import Vue from "vue";
import Router from "vue-router";
import routes from "./router";

const routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch((error) => error);
};

Vue.use(Router);

const router = new Router({
  mode: "hash",
  routes,
});

export default router;
