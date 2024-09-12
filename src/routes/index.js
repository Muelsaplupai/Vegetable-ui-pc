import { createRouter, createWebHashHistory } from "vue-router";

import AnalysisAndPredict from '@/views/FinalComponents/Analysis/AnalysisAndPredict.vue'
import Search from '@/views/FinalComponents/Search/Search.vue'
import Mainmap from '@/views/FinalComponents/ShujuDapin/Mainmap.vue'
import FarmerGuide from '@/views/FinalComponents/NewsandAdvice/FarmerGuide.vue'
import Company from '@/views/FinalComponents/Company/Company.vue'
import { ElMessage } from 'element-plus'
const routes = [
  {
    path: "/",
    name: "home",
    component: () => import('../views/ZhuYe.vue')
  },
  {
    path: "/detail",
    name: "detail",
    component: () => import('../views/detail.vue'),
    children: [
      { path: 'search', component: Search , meta: { requiresAuth: true }},
      { path: 'analysis', component: AnalysisAndPredict, meta: { requiresAuth: true } },
      { path: 'news', component: FarmerGuide },
      { path: 'company', component: Company },
      { path: 'mainmap', component: Mainmap },
      { path: '', redirect: 'search' } // 默认显示的组件
    ]
  },
];

// const router = createRouter({
//   history: createWebHashHistory(),
//   routes,
// });
const router = createRouter({  
  history: createWebHashHistory(),  
  routes  
});  
  
// 路由守卫  
router.beforeEach((to, from, next) => {  
  const token = localStorage.getItem('token'); // 假设token存储在localStorage中  
  if (to.matched.some(record => record.meta.requiresAuth)) {  
    // 需要认证的路由  
    if (!token) {  
      // 没有token，重定向到登录页面  
      next({  
        path: "/",  
        query: { redirect: to.fullPath },
        // ElMessage({
        //   message: 'Warning, this is a warning message.',
        //   type: 'warning',
        // })
      });  
    } else {  
      // 有token，继续路由  
      next();  
    }  
  } else {  
    // 不需要认证的路由，直接放行  
    next();  
  }  
});  
export default router;
