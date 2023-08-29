import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useEffect, useRef, useState } from 'react';

interface ConfigRequest {
  axiosInstance: AxiosInstance;
  method: 'get' | 'post' | 'put' | 'delete' | 'patch';
  url: string;
  config?: AxiosRequestConfig<any>;
  info?: any;
}

export default function useAxios(configRequest: ConfigRequest) {
  const { axiosInstance, method, url, config = {}, info = {} } = configRequest;
  const [data, setData] = useState<AxiosResponse | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const effectRun = useRef(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const res = await axiosInstance[method](url, {
          ...info,
          ...config,
          signal: controller.signal,
        });
        setData(res);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.message);
        } else {
          console.error('Erro inesperado:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    if (effectRun.current) fetchData();

    return () => {
      controller.abort();
      effectRun.current = true;
    };
  }, [axiosInstance, method, url, config, info]);

  return [data, loading, error];
}
