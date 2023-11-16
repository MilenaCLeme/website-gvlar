import api from '../axios-config';
import { ErrorAxios, GetUser, Login, User } from '@/types';

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

export const updatePartialUser = async (id: number, body: User, token: string) => {
  try {
    const update =
      body.role === 'master'
        ? {
            name: body.name,
            phone: body.phone,
            email: body.email,
          }
        : {
            name: body.name,
            role: body.role,
            phone: body.phone,
            email: body.email,
          };
    const { data } = await api.patch<User>(
      `/users/${id}`,
      {
        ...update,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return data as User;
  } catch (error: any) {
    if ('message' in error) {
      return error as ErrorAxios;
    } else {
      console.log('Erro inesperado:', error);
    }
  }
};

export const deleteUser = async (id: number, token: string) => {
  try {
    const { data } = await api.delete<User>(`/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data as User;
  } catch (error: any) {
    if ('message' in error) {
      return error as ErrorAxios;
    } else {
      console.log('Erro inesperado:', error);
    }
  }
};
