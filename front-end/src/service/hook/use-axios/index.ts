import { ErrorAxios } from '@/types';
import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { useCallback, useEffect, useState } from 'react';

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
  const [start, setStart] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
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
  }, [axiosInstance, config, method, url]);

  const sendData = () => {
    fetchData();
  };

  useEffect(() => {
    if (start) {
      fetchData();
      setStart(false);
    }
  }, [start, fetchData]);

  return [data, loading, error, sendData];
};

export { useAxios };
