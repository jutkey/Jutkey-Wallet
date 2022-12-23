// Configuration of Axios
import axios from 'axios';
import { ElMessage } from 'element-plus';
import router from '@/router/index';
import auth from '../auth';
import util from '@/plugins/util';
import { handleGetCookies, handleRemoveCookies } from '@/plugins/common';

const token = handleGetCookies('token');
const apiAddress = auth.getChainUrl();
// eslint-disable-next-line no-unused-vars
const errorHandle = (status: number, other: any) => {
  console.log(status);
  console.log(other);
  util.closeLoading();
  switch (status) {
    case 401: {
      const routeValue = router.replace('/login');
      handleRemoveCookies('token');
      routeValue
        .then(() => {
          window.location.reload();
        })
        .catch(() => {});
      break;
    }
    default: {
      ElMessage.error('request was aborted');
      break;
    }
  }
  /*  if (status !== 200) {
    const routeValue = router.replace('/login');
handleRemoveCookies('token');
    routeValue
      .then(() => {
        window.location.reload();
      })
      .catch(() => {});
  } */
  /*  if (status === 401 || status === -402) {
    router.replace('/login');
    handleRemoveCookies('token');
  } */
};

// Add request interceptor
const service = axios.create({
  timeout: 60000
});
service.interceptors.request.use(
  (config: any) => {
    config.baseURL = `${apiAddress}/api/v2/`;
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    if (config.method === 'post') {
      config.headers['Content-Type'] = 'multipart/form-data';
    }
    return config;
  },
  (error) => {
    //  Response error handling
    return Promise.reject(error);
  }
);
service.interceptors.response.use(
  (response) => {
    // eslint-disable-next-line no-unused-vars
    const { status } = response;
    console.log(status);
    /*  if (status === 401 || status === -402) {
      router.replace('/login');
     handleRemoveCookies('token');
    } */
    return response.status === 200
      ? Promise.resolve(response.data)
      : Promise.reject(response);
  },
  (error) => {
    const { response } = error;
    if (response) {
      console.log(response.status);
      errorHandle(response.status, response.data.message);
      return Promise.reject(response.data);
    }
    console.log('The link has been broken');
  }
);
const http = {
  /**
   * methods: request
   * @param url request address
   * @param params request params
   */
  get(url: string, params?: object) {
    params = {
      _t: Date.parse(String(new Date())) / 1000,
      ...params
    };
    const config = {
      method: 'get',
      url,
      params
    };
    if (params) {
      config.params = params;
    }
    return service(config);
  },
  post(url: string, params?: object) {
    console.log(params);
    const config: any = {
      method: 'post',
      url
    };
    if (params) config.data = params;
    return service(config);
  }
};
// export
export default http;
