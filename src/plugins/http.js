/*
 * @Author: abc
 * @Date: 2020-12-01 16:49:19
 * @LastEditors: abc
 * @LastEditTime: 2021-04-02 10:49:57
 * @Description:axios
 */
import router from '@/router';
import Vue from 'vue';
import VueAxiosPlugin from 'vue-axios-plugin';
import { Message } from 'element-ui';
import baseUrl from '../baseUrl';
import store from '../store/index';
Vue.use(VueAxiosPlugin, {
  // Intercept before launch
  reqHandleFunc: (config) => {
    // console.log(config);
    //if (config.method == 'post') {
    // eslint-disable-next-line no-self-assign
    //config.data = config.data;
    /*  config.data = {
        ...config.data
        //  _t: Date.parse(new Date()) / 1000
      }; */
    // }
    if (config.method == 'get') {
      config.params = {
        //  _t: Date.parse(new Date()) / 1000,
        ...config.params
      };
    }
    // your auth token
    const { nodeTokens, poolTokens, mainTokens, nodeserver } = store.state;
    //  console.log(JSON.stringify(config));
    // console.log(config.url.indexOf('https://') !== -1);
    if (config.url.indexOf('https://') === -1) {
      //  config.headers['Cache-Control'] = 'no-cache';
      let url = baseUrl.nodeserver;
      switch (config.interType) {
        case 'nodeserver':
          url = nodeserver || baseUrl.nodeserver;
          config.headers.Authorization = nodeTokens
            ? `Bearer ${nodeTokens}`
            : '';
          break;
        case 'poolserver':
          url = baseUrl.poolserver;
          config.headers.Authorization = poolTokens
            ? `Bearer ${poolTokens}`
            : '';
          break;
        case 'mainserver':
          url = baseUrl.mainserver;
          config.headers.Authorization = mainTokens
            ? `Bearer ${mainTokens}`
            : '';
          break;
        case 'explorer':
          url = baseUrl.explorerapi;
          config.headers.Authorization = '';
          break;
        case 'locale':
          url = '';
          config.headers.Authorization = '';
          break;
        default:
          config.headers.Authorization = nodeTokens
            ? `Bearer ${nodeTokens}`
            : '';
          url = nodeserver || baseUrl.nodeserver;
          break;
      }
      config.baseURL = url ? `${url}/api/v2` : '';
    }
    config.headers['Content-Type'] =
      'application/x-www-form-urlencoded; charset=utf-8;';
    /*  config.headers.common['access-control-allow-origin'] = '*';
    config.headers['Access-Control-Allow-Headers'] =
      'Origin, Content-Type, X-Auth-Token';
    config.headers['Access-Control-Allow-Methods'] =
      'PUT,POST,GET,DELETE,OPTIONS';
    config.headers['Content-Type'] = 'application/json; charset=utf-8;'; */
    //  config.headers.Accept = 'application/json';
    config.retry = 4;
    config.retryDelay = 1000;
    config.timeout = 60000;
    return config;
  },
  //Request processing error
  reqErrorFunc: (error) => {
    Message.success({
      showClose: true,
      type: 'error',
      message: error,
      duration: 0
    });
  },
  // response success
  resHandleFunc: (response) => response.data,
  // response error
  resErrorFunc: (error) => {
    // console.log(error && error.response);
    if (error.response) {
      const code = parseInt(error.response && error.response.status);
      const url = error.response.request.responseURL;
      Message.error({
        showClose: true,
        type: 'error',
        duration: 0,
        message: `Error：${url};Code：${code}`
      });
      localStorage.removeItem('nodeTokens');
      localStorage.removeItem('poolTokens');
      localStorage.removeItem('mainTokens');
      localStorage.removeItem('isowner');
      localStorage.removeItem('poolid');
      router.replace('/login');
    } else {
      /*  message.error({
        content: `${error}!`,
        duration: 0
      }); */
    }
  }
});
export const { get } = new Vue().$http;
export const { post } = new Vue().$http;
