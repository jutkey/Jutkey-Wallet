// Configuration of Axios
import axios from 'axios';
import router from '@/router/index';
import {
  handleGetObjUrl,
  handleGetCookies,
  handleRemoveCookies
} from '../common';
import auth from '../auth';

console.log(import.meta.env.VITE_NODE_ENV);
const nodeserver = auth.getChainUrl();
const token = handleGetCookies('token');
// eslint-disable-next-line no-unused-vars
const errorHandle = (status: number, other: any) => {
  console.log(status);
  console.log(other);
  if (status !== 200) {
    const routeValue = router.replace('/login');
    handleRemoveCookies('token');
    routeValue
      .then(() => {
        window.location.reload();
      })
      .catch(() => {});
  }
};
let url = '';
// Add request interceptor
const service = axios.create({
  timeout: 60000
});
service.interceptors.request.use(
  (config: any) => {
    // console.log(config);
    const objUrl = handleGetObjUrl() as any;
    console.log(objUrl);
    switch (config.interType) {
      case 'nodeserver':
        url = nodeserver || objUrl.nodeserver;
        url = `${url}/api/v2`;
        break;
      case 'walletserver':
        url = `${objUrl.walletserver}/api/v1`;
        break;
      default:
        url = nodeserver || objUrl.nodeserver;
        url = `${url}/api/v2`;
        break;
    }
    // console.log(url);
    config.baseURL = url || '';
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    // config.headers['Cache-Control'] = 'no-cache';
    config.headers['Content-Type'] = 'application/json; charset=utf-8';
    // config.headers.Accept = 'application/x-www-form-urlencoded; charset=utf-8;';

    // console.log(config);
    return config;
  },
  (error) => {
    //  Response error handling
    return Promise.reject(error);
  }
);
/* const loading = ElLoading.service({
  lock: true,
  text: 'Loading',
  background: 'rgba(0, 0, 0, 0.7)'
}); */
// Add response interceptor
service.interceptors.response.use(
  (response) => {
    const { code } = response.data;
    if (code === 401 || code === -402) {
      router.replace('/login');
      localStorage.removeItem('token');
    }
    return response.status === 200
      ? Promise.resolve(response.data)
      : Promise.reject(response);
  },
  (error) => {
    const { response } = error;
    if (response) {
      // errorHandle(response.status, response.data.message);
      return Promise.reject(response.data);
    }
    console.log('The link has been broken');
  }
);
// console.log(service);
const http = {
  request: service,
  /**
   * methods: request
   * @param url request address
   * @param params request params
   */
  get(url: string, params?: any, type?: string) {
    params = {
      _t: Date.parse(String(new Date())) / 1000,
      ...params
    };
    const config = {
      method: 'get',
      url,
      interType: type,
      params
    };
    if (params) {
      config.params = params;
    }
    return service(config);
  },
  post(url: string, params?: any, type?: string) {
    const config: any = {
      method: 'post',
      url,
      interType: type
    };
    if (params) config.data = params;
    return service(config);
  }
};
// export
export default http;
