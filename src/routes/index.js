import { createRouter, createWebHashHistory } from "vue-router";

import Map from "../views/test.vue";

const routes = [
  {
    path: "/",
    name:"home",
    component: ()=>import ('../views/test.vue')
  },
  {
    path: "/detail",
    name:"detail",
    component: ()=>import ('../views/detail.vue')
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
