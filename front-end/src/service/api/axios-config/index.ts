import axios, { AxiosInstance } from 'axios';
import { errorInterceptor, responseInterceptor } from './interceptors';
import { Environment } from '@/env';

const api: AxiosInstance = axios.create({
  baseURL: Environment.URL_BASE,
  headers: {
    'Content-type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptor(error),
);

export default api;
