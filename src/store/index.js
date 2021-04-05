/*
 * @Author: abc
 * @Date: 2021-01-29 18:41:50
 * @LastEditors: abc
 * @LastEditTime: 2021-03-22 18:11:22
 * @Description:
 */
import Vue from 'vue';
import Vuex from 'vuex';
import routes from '../router/routes.js';
import router from '../router/index';
import Auth from '@/plugins/auth.js';
import util from '@/plugins/util.js';
import { get, post } from '@/plugins/http';
Vue.use(Vuex);
const lang = localStorage.getItem('lang');
const nodeTokens = localStorage.getItem('nodeTokens');
const poolTokens = localStorage.getItem('poolTokens');
const mainTokens = localStorage.getItem('mainTokens');
const poolid = localStorage.getItem('poolid');
const isowner = localStorage.getItem('isowner');
const theme = localStorage.getItem('theme');
let arrBar = ['basic'];
if (poolid) {
  arrBar.push('poolId');
}
if (isowner) {
  arrBar.push('isowner');
}
export default new Vuex.Store({
  state: {
    nodeserver: Auth.getChainUrl(),
    coin: '',
    arrDashData: [],
    booCollapse: false,
    arrBar: arrBar,
    arrSideBar: [],
    theme: theme || 0,
    nodeTokens: nodeTokens || '',
    poolTokens: poolTokens || '',
    mainTokens: mainTokens || '',
    lang: lang || 'en-US',
    userInfo: Auth.getUser() || {},
    hasLogin: Auth.getUser('key_id') ? true : false,
    arrEcologyKey: [],
    isReject: false,
    objPoolInfo: {}
  },
  mutations: {
    login(state, provider) {
      state.hasLogin = true;
      state.userInfo = provider;
      console.log(state.userInfo);
      Auth.setUser(provider);
    },
    logout(state) {
      state.hasLogin = false;
      state.userInfo = {};
      Auth.removeUser();
      localStorage.removeItem('nodeTokens');
      localStorage.removeItem('poolTokens');
      localStorage.removeItem('mainTokens');
      localStorage.removeItem('isowner');
      localStorage.removeItem('poolid');
      //  state.arrBar = ['basic'];
    },
    handleSideNav(state, boo) {
      state.isShow = boo;
    },
    handlePower(state, str) {
      console.log(str);
      state.arrBar.push(str);
    },
    handleShowBar(state, arr) {
      state.arrBar = arr;
    },
    handleChangeToken(state, { type, token }) {
      console.log(type, token);
      state[type] = token;
    },
    handleCollapse(state, boo) {
      state.booCollapse = boo;
    },
    handleChangeLang(state, lang) {
      console.log(lang);
      state.lang = lang;
    },
    handleDashData(state, arr) {
      state.arrDashData = arr;
    },
    handleStrCoin(state, str) {
      state.coin = str;
    },
    handleChangeTheme(state, index) {
      state.theme = index;
    },
    handleKeyInfo(state, assign) {
      var user = assign.rets[0];
      console.log(user);
      state.userInfo.member_name = user.nick_name;
      state.userInfo.amount = user.amount;
      state.userInfo.id = user.id;
      state.userInfo.token_title = user.token_title;
      if (user.member_image_id !== 0) {
        state.userInfo.avatar = `${state.nodeserver}/api/v2/avatar/${user.id}/${
          user.account
        }?${util.guid()}`;
      } else {
        state.userInfo.avatar = ``;
      }
      //  console.log(state.userInfo.avatar);
      Auth.setUser(state.userInfo);
      var ecosystems = {};
      for (var i in assign.rets) {
        var item = assign.rets[i];
        ecosystems[item.id] = {
          name: item.name,
          token_title: item.token_title
        };
      }
      util.setCache('ecosystems', ecosystems);
      //  console.log(state.userInfo);
      if (assign.account) {
        let roles = assign.ecosystems[0].roles;
        let isadmin = 0;
        for (let j in roles) {
          if (roles[j].id == 1) {
            isadmin = 1;
          }
        }
        state.userInfo.isadmin = isadmin;
        Auth.setUser(state.userInfo);
      }
    },
    handleEcologyKey(state, data) {
      state.arrEcologyKey = data;
    },
    handleHasReject(state, arr) {
      if (arr.length) {
        console.log(JSON.stringify(arr));
        let item = arr[0];
        if (item.status == 0 || item.status == 2) {
          state.isReject = true;
        } else {
          state.isReject = false;
        }
      } else {
        state.isReject = false;
      }
      console.log(state.isReject);
    },
    handlePoolInfo(state, obj) {
      console.log(obj);
      if (obj) {
        state.objPoolInfo = obj;
      } else {
        state.objPoolInfo = {};
      }
    }
  },
  actions: {
    handleActionReject({ commit }, arr) {
      commit('handleHasReject', arr);
    },
    handleActionDash({ commit }, arr) {
      commit('handleDashData', arr);
    },
    handleActionCoin({ commit }, str) {
      commit('handleStrCoin', str);
    },
    handleActionTheme({ commit }, index) {
      commit('handleChangeTheme', index);
    },
    async handleActionUser({ state, commit }, obj) {
      console.log(state.userInfo);
      const res = await get(`keyinfo/${state.userInfo.key_id}`);
      const assign = Object.assign({}, res, obj);
      //  console.log(assign);
      commit('handleKeyInfo', assign);
    },
    async handleActionEcology({ commit, dispatch }) {
      const res = await post(
        '/ecosystemkeytotals',
        {
          page: 1,
          limit: 1000,
          order: 'id asc',
          where: {}
        },
        { interType: 'mainserver' }
      );
      commit('handleEcologyKey', res.data);
      dispatch('handleActionUser', res.data);
    },
    async handleActionPoolInfo({ commit }, poolid) {
      const res = await get(
        `minepooldetial/${poolid}`,
        {},
        { interType: 'poolserver' }
      );
      commit('handlePoolInfo', res.data);
    }
  },
  getters: {
    handleGettersPoolInfo(state) {
      return state.objPoolInfo;
    },
    handleGettersReject(state) {
      return state.isReject;
    },
    handleGettersEcologyKey(state) {
      return state.arrEcologyKey.rets;
    },
    handleGettersUserInfo(state) {
      return state.userInfo;
    },
    handleGettersTheme(state) {
      return state.theme;
    },
    handleGettersCoin(state) {
      return state.coin;
    },
    handleGettersDash(state) {
      return state.arrDashData;
    },
    booCollapse(state) {
      return state.booCollapse;
    },
    postLang(state) {
      return state.lang;
    },
    handlePostBar(state) {
      const arrBar = [...new Set(state.arrBar)];
      router.$addRoutes([...Auth.handleRouterFilter(routes, arrBar)]);
      //console.log(arrBar);
      // console.log([...Auth.handleRouterFilter(routes, arrBar)]);
      // console.log(Auth.handleRouterFilter(routes, arrBar));
      return [...Auth.handleRouterFilterShow(routes, arrBar)];
    }
  },
  modules: {}
});
