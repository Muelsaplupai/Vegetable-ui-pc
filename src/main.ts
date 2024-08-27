import { createApp } from "vue";
import App from './App.vue';
import router from './routes/index';
import ElementPlus from 'element-plus'
import "normalize.css";
import 'element-plus/dist/index.css'
import 'fullpage.js';
import VueFullpage from 'vue-fullpage.js'
import VideoBackground from 'vue-responsive-video-background-player';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router);
app.use(ElementPlus);
app.use(VueFullpage);
app.component('video-background', VideoBackground);
app.component('EasyDataTable', Vue3EasyDataTable);
app.mount('#app')
