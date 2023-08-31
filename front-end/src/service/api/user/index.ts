import api from '../axios-config';
import { ErrorAxios, GetUser, Login } from '@/types';

export const LoginUser = async (body: Login) => {
  try {
    const { data } = await api.post<GetUser>('/auth/login', {
      ...body,
    });
    return data as GetUser;
  } catch (error: any) {
    if ('message' in error) {
      return error as ErrorAxios;
    } else {
      console.log('Erro inesperado:', error);
    }
  }
};
