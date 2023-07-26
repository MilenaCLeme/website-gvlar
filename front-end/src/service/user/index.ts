import axios, { AxiosError, AxiosResponse } from 'axios';
import config from '@/config/config';
import { CreateUserClient, Error, GetUser, Login } from '@/types';

interface ApiResponse extends Error, GetUser {}

export async function register(body: CreateUserClient) {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.post<ApiResponse>(
      `${config.apiUrl}/auth/register`,
      {
        ...body,
      },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Lidar com o erro do Axios
      const axiosError = error as AxiosError<ApiResponse>;
      return axiosError.response?.data;
      // Adicione outras ações apropriadas de tratamento de erro aqui
    } else {
      // Lidar com outros tipos de erros que possam ocorrer durante a solicitação
      console.log('Erro inesperado:', error);
    }
  }
}

export async function login(body: Login) {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.post<ApiResponse>(
      `${config.apiUrl}/auth/login`,
      {
        ...body,
      },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Lidar com o erro do Axios
      const axiosError = error as AxiosError<ApiResponse>;
      return axiosError.response?.data;
      // Adicione outras ações apropriadas de tratamento de erro aqui
    } else {
      // Lidar com outros tipos de erros que possam ocorrer durante a solicitação
      console.log('Erro inesperado:', error);
    }
  }
}

export async function checkTokenValidity(token: string) {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.get<ApiResponse>(
      `${config.apiUrl}/auth/check-token`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Lidar com o erro do Axios
      const axiosError = error as AxiosError<ApiResponse>;
      return axiosError.response?.data;
      // Adicione outras ações apropriadas de tratamento de erro aqui
    } else {
      // Lidar com outros tipos de erros que possam ocorrer durante a solicitação
      console.log('Erro inesperado:', error);
    }
  }
}
