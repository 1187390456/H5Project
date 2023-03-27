export default [
  {
    path: "/personalPage/:u",
    name: "personalPage",
    component: () => import("../views/PersonalPage/index.vue"),
  },
  {
    path: "/down",
    name: "downLoad",
    component: () => import("../views/PersonalPage/downlaod.vue"),
  },
];
