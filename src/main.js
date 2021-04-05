/*
 * @Author: abc
 * @Date: 2021-01-29 18:41:50
 * @LastEditors: abc
 * @LastEditTime: 2021-03-22 19:08:51
 * @Description: Master file
 */
import Vue from 'vue';
import App from './App.vue';
import baseUrl from './baseUrl';
import ElementUI from 'element-ui';
import router from './router';
import store from './store';
import moment from 'moment';
import auth from '@/plugins/auth.js';
import myMixin from './plugins/mixins';
import VueI18n from 'vue-i18n';
import enLocale from 'element-ui/lib/locale/lang/en';
import zhLocale from 'element-ui/lib/locale/lang/zh-CN';
import twLocale from 'element-ui/lib/locale/lang/zh-TW';
import jaLocale from 'element-ui/lib/locale/lang/ja';
import util from './plugins/util.js';
import './plugins/http';
import './registerServiceWorker';
import './components/component.js';
const en = require('@/lang/en-us.json');
const zh = require('@/lang/zh-cn.json');
const tw = require('@/lang/zh-tw.json');
const ja = require('@/lang/ja-jp.json');
const mergeZH = Object.assign({}, zhLocale, zh);
const mergeEN = Object.assign({}, enLocale, en);
const mergeTW = Object.assign({}, twLocale, tw);
const mergeJA = Object.assign({}, jaLocale, ja);
Vue.config.productionTip = false;
Vue.prototype.util = util;
Vue.prototype.baseUrl = baseUrl;
Vue.prototype.auth = auth;
Vue.prototype.moment = moment;
Vue.use(myMixin);
Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: store.state.lang,
  messages: {
    'en-US': mergeEN,
    'zh-CN': mergeZH,
    'zh-TW': mergeTW,
    'ja-JP': mergeJA
  }
});
/* 
Global guard
 */
router.beforeEach(async (to, from, next) => {
  // Check if you are logged in
  const token = localStorage.getItem('nodeTokens');
  if (to.path !== '/login' && !token) {
    next({ path: '/login' });
  } else {
    if (to.path === '/login' && token) {
      next('/');
    } else {
      next();
    }
  }
});
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
});
const app = new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App)
}).$mount('#app');

export default app;
