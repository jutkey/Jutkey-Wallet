import { createApp } from 'vue';
import { ElMessage, ElMessageBox, ElLoading } from 'element-plus';
import {
  CaretBottom,
  CaretTop,
  Search,
  CirclePlusFilled
} from '@element-plus/icons-vue';
import VueAxios from 'vue-axios';
import VueSocialSharing from 'vue-social-sharing';
import App from './App.vue';
import router from '@/router';
import i18n from '@/plugins/i18n';
import axios from '@/plugins/http';
import store from '@/store';
import './assets/sass/index.scss';
import 'element-plus/theme-chalk/el-message.css';
import 'element-plus/theme-chalk/el-loading.css';
import 'element-plus/theme-chalk/el-message-box.css';
import { handleGetCookies } from '@/plugins/common';
// console.log(axios);
router.beforeEach((to: any, from: any, next: any) => {
  // console.log(to.path);
  const token = handleGetCookies('token');
  console.log(token);
  if (to.path !== '/login' && !token) {
    next({ path: '/login' });
  } else {
    if (token && to.path === '/login') {
      next('/');
    }
    next();
  }
});
const app = createApp(App);
app
  .use(store)
  .use(router)
  .use(i18n)
  .use(ElMessage)
  .use(ElMessageBox)
  .use(ElLoading)
  .use(VueSocialSharing)
  .use(VueAxios, { http: axios, axios })
  .mount('#app');
app.provide('axios', axios); // provide 'axios2'
app.component('CaretBottom', CaretBottom);
app.component('CaretTop', CaretTop);
app.component('Search', Search);
app.component('CirclePlusFilled', CirclePlusFilled);
