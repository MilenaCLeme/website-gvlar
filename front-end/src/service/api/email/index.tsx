import { ErrorAxios, SendEmail } from '@/types';
import api from '../axios-config';

export const sendEmail = async (sendEmail: SendEmail) => {
  try {
    const { data } = await api.post(`/mail`, sendEmail);
    return data;
  } catch (error: any) {
    if ('message' in error) {
      return error as ErrorAxios;
    } else {
      console.log('Erro inesperado:', error);
    }
  }
};
