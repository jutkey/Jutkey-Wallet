import { createStore } from 'vuex';
import auth from '@/plugins/auth';
import axios from '@/plugins/http';
import { handleGetCookies } from '@/plugins/common';

const lang = localStorage.getItem('lang');
const theme = localStorage.getItem('theme');
const token = handleGetCookies('token');
const words = localStorage.getItem('words');
const current = localStorage.getItem('current');
const account = localStorage.getItem('account');
export default createStore({
  state: {
    lang: lang || 'en',
    theme: theme || 'dark',
    token: token || '',
    nodeserver: auth.getChainUrl(),
    words: words || '',
    current: current || '',
    account: account || '',
    isCollapse: false,
    objBalance: {},
    socketData: {},
    ecoList: [],
    avatar: ''
  },
  mutations: {
    handleMutavatar(state, url) {
      state.avatar = url;
    },
    handleMutWords(state, words) {
      state.words = words;
    },
    handleMutToken(state, token) {
      state.token = token;
    },
    handleMutCurrent(state, current) {
      state.current = current;
    },
    handleMutAccount(state, account) {
      state.account = account;
    },
    handleMutCollapse(state, boo: boolean) {
      state.isCollapse = boo;
    },
    handleMutTheme(state, theme: string) {
      state.theme = theme;
    },
    handleMutBalance(state, obj: any) {
      state.objBalance = obj;
    },
    handleMutSocket(state, data) {
      state.socketData = data;
    },
    handleMutEcolist(state, data) {
      state.ecoList = data;
    }
  },
  actions: {
    async handleActSocket({ commit }) {
      const res = await axios.get('websocket_token', {}, 'walletserver');
      commit('handleMutSocket', res.data);
      return new Promise((resolve, reject) => {
        if (res.code === 0) {
          resolve(res.data);
        } else {
          reject(new Error('get balance error'));
        }
      });
    },
    handleActavatar({ commit }, url) {
      commit('handleMutavatar', url);
    },
    handleActWords({ commit }, words) {
      commit('handleMutWords', words);
    },

    handleActToken({ commit }, token) {
      commit('handleMutToken', token);
    },
    handleActCurrent({ commit }, obj) {
      commit('handleMutCurrent', obj);
    },
    handleActAccount({ commit }, arr) {
      commit('handleMutAccount', arr);
    },
    handleActCollapse({ commit }, boo: boolean) {
      commit('handleMutCollapse', boo);
    },
    handleActTheme({ commit }, theme: string) {
      commit('handleMutTheme', theme);
    },
    async handleActEcolist({ commit }, obj: any) {
      const params = {
        wallet: obj.account,
        search: '',
        order: obj.order
      };
      const res = await axios.post('ecosystem_search', params, 'walletserver');
      if (res.code === 0) {
        return commit('handleMutEcolist', res.data);
      }
      commit('handleMutEcolist', []);
    },
    async handleActBalance({ commit }, values) {
      const { account, ecosystem } = values;
      const params = {
        wallet: account,
        ecosystem
      };
      const res = await axios.post('/key_amount', params, 'walletserver');
      if (res.code === 0) {
        commit('handleMutBalance', res.data);
      }
      return new Promise((resolve, reject) => {
        if (res.code === 0) {
          resolve(res.data);
        } else {
          reject(new Error('get balance error'));
        }
      });
    }
  },
  getters: {
    postWords(state) {
      return state.words;
    },
    postAvatar(state) {
      return state.avatar;
    },
    postToken(state) {
      return state.token;
    },
    postCurrent(state) {
      return state.current;
    },
    postAccount(state) {
      return state.account;
    },
    postCollapse(state) {
      return state.isCollapse;
    },
    postTheme(state) {
      return state.theme;
    },
    postBalance(state) {
      return state.objBalance;
    },
    postEcoList(state) {
      return state.ecoList;
    }
  }
});
