import { ErrorAxios, Property } from '@/types';
import api from '../axios-config';

export const uploadPhoto = async (id: number, formData: FormData, token: string) => {
  try {
    const { data } = await api.post(`/photo/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    return data as Property;
  } catch (error: any) {
    if ('message' in error) {
      return error as ErrorAxios;
    } else {
      console.log('Erro inesperado:', error);
    }
  }
};

export const deletePhoto = async (id: number, token: string) => {
  try {
    const { data } = await api.delete(`/photo/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data as Property;
  } catch (error: any) {
    if ('message' in error) {
      return error as ErrorAxios;
    } else {
      console.log('Erro inesperado:', error);
    }
  }
};
