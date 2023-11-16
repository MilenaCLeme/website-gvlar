import api from '../axios-config';
import {
  CreateUserClient,
  ErrorAxios,
  GetUser,
  Login,
  Reset,
  Sucess,
  UpdateUser,
  User,
} from '@/types';

interface ChangePassword {
  passwordOld: string;
  passwordNew: string;
}

// Token
export const checkToken = async (token: string) => {
  try {
    const { data } = await api.get<GetUser>('/auth/check-token', {
      headers: { Authorization: `Bearer ${token}` },
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

// User
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
    const { data } = await api.post<GetUser>('/auth/register', { ...body });

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
    const { data } = await api.post<Sucess>('/auth/validate', { email });

    return data as Sucess;
  } catch (error: any) {
    if ('message' in error) {
      return error as ErrorAxios;
    } else {
      console.log('Erro inesperado:', error);
    }
  }
};

export const logout = async (token: string) => {
  try {
    const { data } = await api.get<Sucess>('/auth/logout', {
      headers: { Authorization: `Bearer ${token}` },
    });

    return data as Sucess;
  } catch (error: any) {
    if ('message' in error) {
      return error as ErrorAxios;
    } else {
      console.log('Erro inesperado:', error);
    }
  }
};

export const updateUser = async (token: string, body: UpdateUser) => {
  try {
    const { data } = await api.patch<User>(
      '/auth/register',
      { ...body },
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

export const changePassword = async (token: string, body: ChangePassword) => {
  try {
    const { data } = await api.patch<User>(
      '/auth/changepassword',
      { ...body },
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

export const validationEmail = async (id: number) => {
  try {
    const { data } = await api.get<Sucess>(`/auth/validation/${id}`);

    return data as Sucess;
  } catch (error: any) {
    if ('message' in error) {
      return error as ErrorAxios;
    } else {
      console.log('Erro inesperado:', error);
    }
  }
};

export const forgetPassword = async (email: string) => {
  try {
    const { data } = await api.post<Sucess>(`/auth/forget`, { email });

    return data as Sucess;
  } catch (error: any) {
    if ('message' in error) {
      return error as ErrorAxios;
    } else {
      console.log('Erro inesperado:', error);
    }
  }
};

export const resetPassword = async (id: number, reset: Reset) => {
  try {
    const { data } = await api.post<Sucess>(`/auth/reset/${id}`, {
      password: reset.password,
      number: reset.one + reset.two + reset.three + reset.four,
    });

    return data as Sucess;
  } catch (error: any) {
    if ('message' in error) {
      return error as ErrorAxios;
    } else {
      console.log('Erro inesperado:', error);
    }
  }
};
