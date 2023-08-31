import api from '../axios-config';
import { CreateUserClient, ErrorAxios, GetUser, Login, Sucess } from '@/types';

export const loginUser = async (body: Login) => {
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

export const registerUser = async (body: CreateUserClient) => {
  try {
    const { data } = await api.post('/auth/register', { ...body });

    return data as GetUser;
  } catch (error: any) {
    if ('message' in error) {
      return error as ErrorAxios;
    } else {
      console.log('Erro inesperado:', error);
    }
  }
};

export const resendEmail = async (email: string) => {
  try {
    const { data } = await api.post('/auth/validate', { email });

    return data as Sucess;
  } catch (error: any) {
    if ('message' in error) {
      return error as ErrorAxios;
    } else {
      console.log('Erro inesperado:', error);
    }
  }
};
