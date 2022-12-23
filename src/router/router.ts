import Index from 'pages/index.vue';

const routes = [
  {
    path: '/',
    component: Index,
    meta: {
      key: '1',
      title: 'nav.dashboard'
    },
    children: [
      {
        path: '',
        name: 'Home',
        component: () =>
          import(
            /* webpackChunkName: "assets" */ '@/pages/dashboard/index.vue'
          ),
        meta: {
          key: '1-1',
          title: 'nav.dashboard'
        }
      },
      {
        path: '/assets',
        component: () =>
          import(/* webpackChunkName: "assets" */ '@/pages/assets/index.vue'),
        meta: {
          key: '2',
          title: 'nav.assets'
        },
        children: [
          {
            path: '',
            name: 'Assets',
            component: () =>
              import(
                /* webpackChunkName: "assets" */ '@/pages/assets/assets.vue'
              ),
            meta: {
              key: '2-1',
              title: 'nav.assets'
            }
          },
          {
            path: 'airdrop',
            name: 'AssetsAirdrop',
            component: () =>
              import(
                /* webpackChunkName: "assets" */ '@/pages/assets/airdrop.vue'
              ),
            meta: {
              key: '2-2',
              title: 'nav.assets'
            }
          },
          {
            path: '/assets/transfer/:id/:account',
            name: 'Transfer',
            component: () =>
              import(
                /* webpackChunkName: "assets" */ '@/pages/assets/transfer.vue'
              ),
            meta: {
              key: '2-3',
              title: 'nav.assets'
            }
          },
          {
            path: '/assets/record/:id/:account',
            name: 'Record',
            component: () =>
              import(
                /* webpackChunkName: "assets" */ '@/pages/assets/record.vue'
              ),
            meta: {
              key: '2-4',
              title: 'nav.assets'
            }
          }
        ]
      },
      {
        path: '/nft',
        component: () =>
          import(/* webpackChunkName: "nft" */ '@/pages/nft/index.vue'),
        meta: {
          key: '3',
          title: 'nft.title'
        },
        children: [
          {
            path: '',
            name: 'NFT',
            component: () =>
              import(/* webpackChunkName: "nft" */ '@/pages/nft/nft.vue'),
            meta: {
              key: '3-1',
              title: 'nft.list'
            }
          },
          {
            path: ':id',
            name: 'NFTDetails',
            component: () =>
              import(
                /* webpackChunkName: "nft" */ '@/pages/nft/nftDetails.vue'
              ),
            meta: {
              key: '3-2',
              title: 'nft.list'
            }
          }
        ]
      },
      {
        path: '/ethereum',
        component: () =>
          import(
            /* webpackChunkName: "ethereum" */ '@/pages/ethereum/index.vue'
          ),
        meta: {
          key: '4',
          title: 'nav.eth'
        },
        children: [
          {
            path: '',
            name: 'Ethereum',
            component: () =>
              import(
                /* webpackChunkName: "ethereum" */ '@/pages/ethereum/assets.vue'
              ),
            meta: {
              key: '4-1',
              title: 'nav.assets'
            }
          },
          {
            path: '/ethereum/transfer/:address',
            name: 'EthTransfer',
            component: () =>
              import(
                /* webpackChunkName: "ethereum" */ '@/pages/ethereum/transfer.vue'
              ),
            meta: {
              key: '4-2',
              title: 'nav.eth'
            }
          },
          {
            path: '/ethereum/transfer/token/:contractAddress',
            name: 'TokenTransfer',
            component: () =>
              import(
                /* webpackChunkName: "ethereum" */ '@/pages/ethereum/tokenTransfer.vue'
              ),
            meta: {
              key: '4-3',
              title: 'nav.eth'
            }
          },
          {
            path: '/ethereum/record/:address',
            name: 'EthRecord',
            component: () =>
              import(
                /* webpackChunkName: "ethereum" */ '@/pages/ethereum/record.vue'
              ),
            meta: {
              key: '4-4',
              title: 'nav.assets'
            }
          },
          {
            path: '/ethereum/record/token/:contractAddress',
            name: 'TokenRecord',
            component: () =>
              import(
                /* webpackChunkName: "ethereum" */ '@/pages/ethereum/tokenRecord.vue'
              ),
            meta: {
              key: '4-5',
              title: 'nav.assets'
            }
          }
        ]
      },
      {
        path: '/tron',
        name: 'Tron',
        component: () =>
          import(/* webpackChunkName: "tron" */ '@/pages/tron/index.vue'),
        meta: {
          key: '9',
          title: 'nav.eth'
        }
      },
      {
        path: '/honor',
        component: () =>
          import(/* webpackChunkName: "honor" */ '@/pages/honor/index.vue'),
        meta: {
          key: '5',
          title: 'nav.honor'
        },
        children: [
          {
            path: '',
            name: 'Honor',
            component: () =>
              import(/* webpackChunkName: "honor" */ '@/pages/honor/honor.vue'),
            meta: {
              key: '5-1',
              title: 'nav.eth'
            }
          },
          {
            path: ':id',
            name: 'HonorId',
            component: () =>
              import(
                /* webpackChunkName: "honor" */ '@/pages/honor/honorId.vue'
              ),
            meta: {
              key: '5-2',
              title: 'nav.eth'
            }
          },
          {
            path: '/honor/vote/:id',
            name: 'VoteRecord',
            component: () =>
              import(
                /* webpackChunkName: "honor" */ '@/pages/honor/voteRecord.vue'
              ),
            meta: {
              key: '5-3',
              title: 'nav.eth'
            }
          },
          {
            path: '/honor/stake/:id',
            name: 'StakeRecord',
            component: () =>
              import(
                /* webpackChunkName: "honor" */ '@/pages/honor/stakeRecord.vue'
              ),
            meta: {
              key: '5-4',
              title: 'nav.eth'
            }
          }
        ]
      },
      {
        path: '/manage',
        name: 'Manage',
        component: () =>
          import(/* webpackChunkName: "manage" */ '@/pages/manage/index.vue'),
        meta: {
          key: '6',
          title: 'nav.manage'
        }
      },
      {
        path: '/help',
        component: () =>
          import(/* webpackChunkName: "manage" */ '@/pages/help/index.vue'),
        meta: {
          key: '7',
          title: 'nav.help'
        },
        children: [
          {
            path: '',
            name: 'Help',
            component: () =>
              import(/* webpackChunkName: "help" */ '@/pages/help/help.vue'),
            meta: {
              key: '7-1',
              title: 'nav.massage'
            }
          },
          {
            path: ':id',
            name: 'HelpDetails',
            component: () =>
              import(
                /* webpackChunkName: "help" */ '@/pages/help/helpDetails.vue'
              ),
            meta: {
              key: '7-2',
              title: 'nav.massage'
            }
          }
        ]
      },
      {
        path: '/about',
        name: 'About',
        component: () =>
          import(/* webpackChunkName: "about" */ '@/pages/about/index.vue'),
        meta: {
          key: '8',
          title: 'nav.help'
        }
      }
    ]
  }
];

export default routes;
