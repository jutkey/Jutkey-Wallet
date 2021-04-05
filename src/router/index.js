/*
 * @Author: abc
 * @Date: 2021-01-29 18:41:50
 * @LastEditors: abc
 * @LastEditTime: 2021-03-09 16:16:03
 * @Description:
 */
import Vue from 'vue';
import Router from 'vue-router';
//import routes from './routes.js';
Vue.use(Router);
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
const originalReplace = Router.prototype.replace;
// push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};
// replace
Router.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalReplace.call(this, location, onResolve, onReject);
  return originalReplace.call(this, location).catch((err) => err);
};

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'lick-active',
  routes: [
    {
      path: '/login',
      name: 'Login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "login" */ '@/views/login/login.vue'),
      meta: {
        key: '0',
        title: 'user.login',
        icon: '',
        show: false,
        roles: 'basic'
      }
    }
  ]
});
router.$addRoutes = (params) => {
  router.matcher = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    linkActiveClass: 'lick-active',
    routes: [
      {
        path: '/login',
        name: 'Login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "login" */ '@/views/login/login.vue'),
        meta: {
          key: '0',
          title: 'user.login',
          icon: '',
          show: false,
          roles: 'basic'
        }
      }
    ]
  }).matcher;
  //  console.log(JSON.stringify(params));
  router.addRoutes(params);
};
export default router;
