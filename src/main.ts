import { createApp } from "vue";
import App from './App.vue';
import router from './routes/index';
import ElementPlus from 'element-plus'
import "normalize.css";
import 'element-plus/dist/index.css'
import 'fullpage.js';
import VueFullpage from 'vue-fullpage.js'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.use(router);
app.use(ElementPlus);
app.use(VueFullpage)
app.mount('#app')
