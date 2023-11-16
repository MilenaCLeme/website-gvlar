import { ErrorAxios, Owner, Property } from '@/types';
import api from '../axios-config';

export const createOwner = async (token: string, body: Owner) => {
  try {
    const { data } = await api.post<Property>(
      '/owners',
      {
        name: body.name,
        email: body.email,
        phone: body.phone,
        propertyId: body.propertyId,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return data as Property;
  } catch (error: any) {
    if ('message' in error) {
      return error as ErrorAxios;
    } else {
      console.log('Erro inesperado:', error);
    }
  }
};

export const deleteOwner = async (token: string, id: number) => {
  try {
    const { data } = await api.delete<Owner>(`/owners/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data as Owner;
  } catch (error: any) {
    if ('message' in error) {
      return error as ErrorAxios;
    } else {
      console.log('Erro inesperado:', error);
    }
  }
};
