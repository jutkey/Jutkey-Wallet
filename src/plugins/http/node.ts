// Configuration of Axios
import axios from 'axios';

// eslint-disable-next-line no-unused-vars
const errorHandle = (status: number, other: any) => {
  console.log(status);
  console.log(other);
  if (status !== 200) {
    console.log('+++++==');
  }
};
// Add request interceptor
const service = axios.create({
  timeout: 60000
});
service.interceptors.request.use(
  (config: any) => {
    config.headers['Content-Type'] = 'application/json; charset=utf-8';
    return config;
  },
  (error) => {
    //  Response error handling
    console.log(error);
    return Promise.reject(error);
  }
);
service.interceptors.response.use(
  (response) => {
    const { code } = response.data;
    if (code === 401 || code === -402) {
      localStorage.removeItem('token');
    }
    return response.status === 200
      ? Promise.resolve(response.data)
      : Promise.reject(response);
  },
  (error) => {
    const { response } = error;
    console.log(response.data);
    // return Promise.resolve(response.data);
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
