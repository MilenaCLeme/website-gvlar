/*
import { Login } from '@/types';
import { Api } from '../axios-config';

const login = async (body: Login): Promise<any> => {
  try {
    const { data } = await Api.post('/auth/login', {
      ...body,
    });

    if (data) {
      return data;
    }
  } catch (error) {
    return new Error((error as { message: string }).message || 'Error ao fazer o login');
  }
};
*/
