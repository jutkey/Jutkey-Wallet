const other = [
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "login" */ 'pages/login/index.vue'),
    meta: {
      key: '0',
      title: 'user.login'
    }
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () =>
      import(/* webpackChunkName: "404" */ 'pages/error/index.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
];
export default other;
