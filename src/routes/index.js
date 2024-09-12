import { createRouter, createWebHashHistory } from "vue-router";

import Map from "../views/ZhuYe.vue";
import AnalysisAndPredict from '@/views/Detail1/AnalysisAndPredict.vue'
import Search from '@/views/Detail1/Search.vue'
import News from '@/views/Detail1/News.vue'
import Advice from '@/views/Detail1/Advice.vue'
import Mainmap from '@/views/Detail1/Mainmap.vue'
import FarmerGuide from '@/views/Main-2/FarmerGuide.vue'
import Company from '@/views/Main-2/Company.vue'
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
    component: () => import('../views/Detail1/detail.vue'),
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
