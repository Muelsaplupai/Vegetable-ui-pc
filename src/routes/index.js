import { createRouter, createWebHashHistory } from "vue-router";

import Map from "../views/test.vue";

const routes = [
  {
    path: "/",
    name:"home",
    component: ()=>import ('../views/test.vue')
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
