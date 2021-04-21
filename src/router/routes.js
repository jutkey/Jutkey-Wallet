/*
 * @Author: abc
 * @Date: 2021-02-04 18:52:25
 * @LastEditors: abc
 * @LastEditTime: 2021-04-21 18:56:18
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
          roles: 'basic1'
        }
      }
    ]
  },
  {
    path: '/miner',
    component: () =>
      import(/* webpackChunkName: "miner"*/ '@/views/miner/index.vue'),
    meta: {
      key: '3',
      title: 'navbar.mine',
      icon: 'iconfont  el-ui-Group14',
      show: true,
      roles: 'basic',
      isChild: false
    },
    children: [
      {
        path: '',
        name: 'Miner',
        component: () =>
          import(/* webpackChunkName: "miner"*/ '@/views/miner/miner.vue'),
        meta: {
          key: '3-1',
          title: 'navbar.mine',
          icon: 'iconfont  el-ui-Group14',
          show: false,
          roles: 'basic'
        }
      },
      {
        path: '/miner/minerDetails/:id',
        name: 'MinerDetails',
        component: () =>
          import(
            /* webpackChunkName: "miner"*/ '@/views/miner/minerDetails.vue'
          ),
        meta: {
          key: '3-2',
          title: 'navbar.mine',
          icon: '',
          show: false,
          roles: 'basic'
        }
      }
    ]
  },
  {
    path: '/notice',
    component: () =>
      import(/* webpackChunkName: "notice" */ '@/views/notice/index.vue'),
    meta: {
      key: '5',
      title: 'navbar.notice',
      icon: 'iconfont el-ui-Group10',
      show: true,
      roles: 'basic',
      isChild: false
    },
    children: [
      {
        path: '',
        name: 'Notifications',
        component: () =>
          import(
            /* webpackChunkName: "notice" */ '@/views/notice/notifications.vue'
          ),
        meta: {
          key: '5-2',
          title: 'navbar.notice',
          icon: 'iconfont el-ui-Group10',
          show: false,
          roles: 'basic'
        }
      },
      {
        path: 'chainDetails/:id',
        name: 'chainDetails',
        component: () =>
          import(
            /* webpackChunkName: "notice" */ '@/views/notice/chainDetails.vue'
          ),
        meta: {
          key: '5-3',
          title: 'navbar.notice',
          icon: 'iconfont el-ui-Group10',
          show: false,
          roles: 'basic'
        }
      },
      {
        path: 'generalDetails/:id',
        name: 'GeneralDetails',
        component: () =>
          import(
            /* webpackChunkName: "notice" */ '@/views/notice/generalDetails.vue'
          ),
        meta: {
          key: '5-4',
          title: 'navbar.notice',
          icon: 'iconfont el-ui-Group10',
          show: false,
          roles: 'basic'
        }
      }
    ]
  },
  {
    path: '/help',
    name: 'HelpCenter',
    component: () =>
      import(/* webpackChunkName: "help" */ '@/views/help/helpCenter.vue'),
    meta: {
      key: '6',
      title: 'navbar.help',
      icon: 'iconfont el-ui-fa',
      show: true,
      roles: 'basic'
    }
  },
  {
    path: '/node',
    component: () =>
      import(/* webpackChunkName: "node"*/ '@/views/node/index.vue'),
    meta: {
      key: '7',
      title: 'navbar.node',
      icon: 'iconfont  el-ui-asa',
      show: true,
      roles: 'isowner1',
      isChild: true
    },
    children: [
      {
        path: '/node/honor',
        name: 'NodeHonor',
        component: () =>
          import(/* webpackChunkName: "node"*/ '@/views/node/honorNode.vue'),
        meta: {
          key: '7-1',
          title: 'navbar.node',
          icon: '',
          show: true,
          roles: 'isowner1'
        }
      },
      {
        path: '/node/guardian',
        name: 'GuardianNode',
        component: () =>
          import(/* webpackChunkName: "node"*/ '@/views/node/guardianNode.vue'),
        meta: {
          key: '7-2',
          title: 'navbar.nodetype.daemon',
          icon: '',
          show: true,
          roles: 'isowner1'
        }
      },
      {
        path: '/node/mint',
        name: 'MintNode',
        component: () =>
          import(/* webpackChunkName: "node"*/ '@/views/node/mintNode.vue'),
        meta: {
          key: '7-3',
          title: 'navbar.nodetype.mint',
          icon: '',
          show: true,
          roles: 'isowner1'
        }
      },
      {
        path: '/node/sub',
        name: 'SubNode',
        component: () =>
          import(/* webpackChunkName: "node"*/ '@/views/node/subNode.vue'),
        meta: {
          key: '7-4',
          title: 'navbar.nodetype.child',
          icon: '',
          show: true,
          roles: 'isowner1'
        }
      },
      {
        path: '/node/clb',
        name: 'CLBNode',
        component: () =>
          import(/* webpackChunkName: "node"*/ '@/views/node/clbNode.vue'),
        meta: {
          key: '7-5',
          title: 'navbar.nodetype',
          icon: '',
          show: true,
          roles: 'isowner1'
        }
      }
    ]
  },
  {
    path: '/ecolibs',
    name: 'Ecolibs',
    component: () =>
      import(
        /* webpackChunkName: "ecolibs" */ '@/views/ecolibs/ecolibsList.vue'
      ),
    meta: {
      key: '8',
      title: 'navbar.ecosystems',
      icon: 'iconfont el-ui-oup10',
      show: true,
      roles: 'basic'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/about/about.vue'),
    meta: {
      key: '9',
      title: 'navbar.about_us',
      icon: 'iconfont el-ui-up10',
      show: true,
      roles: 'basic'
    }
  },
  {
    path: '/404',
    component: () =>
      import(/* webpackChunkName: "e" */ '@/views/error/404.vue'),
    meta: {
      key: '10-1',
      title: '404',
      icon: '',
      show: false,
      roles: 'basic'
    }
  },
  {
    path: '*',
    redirect: '/404',
    meta: {
      key: '10-2',
      title: '404',
      icon: '',
      show: false,
      roles: 'basic'
    }
  }
];
export default routes;
