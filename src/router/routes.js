/*
 * @Author: abc
 * @Date: 2021-02-04 18:52:25
 * @LastEditors: abc
 * @LastEditTime: 2021-04-05 10:51:23
 * @Description: routes Array
 */
const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () =>
      import(
        /* webpackChunkName: "dashboard" */ '@/views/dashboard/dashboard.vue'
      ),
    meta: {
      key: '1',
      title: 'navbar.dashboard',
      icon: 'iconfont el-ui-Group9',
      show: true,
      roles: 'basic'
    }
  },
  {
    path: '/user',
    component: () =>
      import(/* webpackChunkName: "user" */ '@/views/user/index.vue'),
    meta: {
      key: '2',
      title: 'navbar.user_center',
      icon: 'iconfont el-ui-Group211',
      show: true,
      roles: 'basic',
      isChild: false
    },
    children: [
      {
        path: '',
        name: 'User',
        component: () =>
          import(/* webpackChunkName: "user" */ '@/views/user/user.vue'),
        meta: {
          key: '2-1',
          title: 'navbar.user_center',
          icon: 'iconfont el-ui-Group211',
          show: false,
          roles: 'basic',
          isChild: false
        }
      },
      {
        path: '/user/transfer/:id',
        name: 'UserTransfer',
        component: () =>
          import(
            /* webpackChunkName: "user" */ '@/views/user/userTransfer.vue'
          ),
        meta: {
          key: '2-2',
          title: 'transferrecord',
          icon: '',
          show: false,
          roles: 'basic'
        }
      },
      {
        path: '/user/otherTransfer/:id',
        name: 'OtherTransfer',
        component: () =>
          import(
            /* webpackChunkName: "user" */ '@/views/user/otherTransfer.vue'
          ),
        meta: {
          key: '2-3',
          title: 'transferrecord',
          icon: '',
          show: false,
          roles: 'basic'
        }
      }
    ]
  },
  {
    path: '/404',
    component: () =>
      import(/* webpackChunkName: "e" */ '@/views/error/404.vue'),
    meta: {
      key: '10-1',
      title: '',
      icon: '',
      show: true,
      roles: 'basic'
    }
  },
  {
    path: '*',
    redirect: '/404',
    meta: {
      key: '10-2',
      title: '',
      icon: '',
      show: true,
      roles: 'basic'
    }
  }
];
export default routes;
