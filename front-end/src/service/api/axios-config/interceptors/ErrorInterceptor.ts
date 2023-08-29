import { Error } from '@/types';
import { AxiosError } from 'axios';

export const errorInterceptor = (error: AxiosError) => {
  if (error.message === 'Network Error') {
    return Promise.reject(new Error('Erro de conexão'));
  }

  if (error.response?.status === 401) {
    return Promise.reject(new Error('Acesso não autorizado. Faça login para continuar.'));
  }

  const data = error.response?.data as Error;

  if (data) {
    return Promise.reject(
      new Error(`${typeof data.message === 'object' ? data.message.join(' ') : data.message}`),
    );
  }

  return Promise.reject(error);
};
