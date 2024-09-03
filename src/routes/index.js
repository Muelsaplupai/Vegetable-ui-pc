import { createRouter, createWebHashHistory } from "vue-router";

import Map from "../views/test.vue";
import AnalysisAndPredict from '@/views/Detail1/AnalysisAndPredict.vue'
import Search from '@/views/Detail1/Search.vue'
import News from '@/views/Detail1/News.vue'
import Advice from '@/views/Detail1/Advice.vue'
import Mainmap from '@/views/Detail1/Mainmap.vue'
import FarmerGuide from '@/views/Main-2/FarmerGuide.vue'
import Company from '@/views/Main-2/Company.vue'
const routes = [
  {
    path: "/",
    name: "home",
    component: () => import('../views/test.vue')
  },
  {
    path: "/detail",
    name: "detail",
    component: () => import('../views/Detail1/detail.vue'),
    children: [
      { path: 'search', component: Search },
      { path: 'analysis', component: AnalysisAndPredict },
      { path: 'news', component: FarmerGuide },
      { path: 'company', component: Company },
      { path: 'mainmap', component: Mainmap },
      { path: '', redirect: 'search' } // 默认显示的组件
    ]
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
