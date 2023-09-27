import { ErrorAxios } from '@/types';
import axios, { AxiosError } from 'axios';

interface CEP {
  bairro: string;
  cep: string;
  complemento: string;
  ddd: string;
  gia: string;
  ibge: string;
  localidade: string;
  logradouro: string;
  siafi: string;
  uf: string;
}

export const apiCep = async (cep: string) => {
  try {
    const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    return data as CEP;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      // Lidar com o erro do Axios
      const axiosError = error as AxiosError;
      return axiosError.response?.data as ErrorAxios;
    } else {
      // Lidar com outros tipos de erros que possam ocorrer durante a solicitação
      console.log('Erro inesperado:', error);
    }
  }
};
