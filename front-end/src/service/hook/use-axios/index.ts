import { ErrorAxios } from '@/types';
import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';

interface ConfigRequest {
  axiosInstance: AxiosInstance;
  method: 'get' | 'post' | 'put' | 'delete' | 'patch';
  url: string;
  config?: AxiosRequestConfig<any>;
}

const useAxios = (configRequest: ConfigRequest) => {
  const { axiosInstance, method, url, config = {} } = configRequest;
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorAxios | null>({} as ErrorAxios);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance[method](url, {
          ...config,
        });

        setData(res.data);
      } catch (error: any) {
        if ('message' in error) {
          setError({ ...error });
        } else {
          console.log('Erro inesperado:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    if (loading) {
      fetchData().then((r) => r);
    }
  }, [axiosInstance, method, url, config, loading]);

  return [data, loading, error];
};

export { useAxios };
