import { AxiosRequestConfig, AxiosResponseHeaders } from 'axios';

export interface AxiosResponse<T = any, D = any> {
  data: T;
  status: number;
  statusText: string;
  headers: AxiosResponseHeaders;
  config: AxiosRequestConfig<D>;
  request?: any;
}

declare module 'axios' {
  export interface AxiosResponse<T = any> extends Promise<T> {}
}
