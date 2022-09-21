import {
  createRouter,
  createWebHistory,
  // eslint-disable-next-line no-unused-vars
  createWebHashHistory
} from 'vue-router';
import routes from './router';
import other from './other';

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'router-active-class'
});
other.forEach((item) => {
  router.addRoute(item);
});
// Routing global front guard
/* router.beforeEach(async (to, from) => {
  // console.log("Routing global front guard", to, from);
  return await canUserAccess(to);
});

// Routing global post guard
router.afterEach(async (to, from) => {
  console.log('Routing global post guard', to, from);
  return await canUserAccess(to);
}); */
/* router.beforeEach((to, from, next) => {
  console.log(to);

  if (to.hash === '#close') {
    next({

    })
  }
  next();
}); */
export default router;
