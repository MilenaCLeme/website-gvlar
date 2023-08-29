import axios, { AxiosInstance } from 'axios';
import { errorInterceptor, responseInterceptor } from './interceptors';

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
});

api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptor(error),
);

export default api;
