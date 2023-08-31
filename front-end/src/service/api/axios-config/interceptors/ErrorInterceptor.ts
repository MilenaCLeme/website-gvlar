import { AxiosError } from 'axios';

export interface ErrorAxiosData {
  error: string;
  message: string | string[];
  statusCode: number;
}

export const errorInterceptor = (error: AxiosError): Promise<any | ErrorAxiosData> => {
  if (error.message === 'Network Error') {
    return Promise.reject(new Error('Erro de conexão'));
  }

  const data = error.response?.data as ErrorAxiosData;

  if (data.message) {
    data.message = `${typeof data.message === 'object' ? data.message.join(' ') : data.message}`;
    return Promise.reject(data);
  }

  return Promise.reject(error);
};
