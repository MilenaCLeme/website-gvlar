import { checkToken } from '@/service/api/auth';
import { User } from '@/types';
import { ReactNode, createContext, useEffect, useMemo, useState } from 'react';

type PropsContext = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
};

const DEFAULT_VALUE = {
  user: null,
  setUser: () => {
    // Start func
  },
  token: '',
  setToken: () => {
    // Start func
  },
};

export const Context = createContext<PropsContext>(DEFAULT_VALUE);

interface AuxProps {
  children: ReactNode;
}

export function ContextProvider({ children }: AuxProps) {
  const [user, setUser] = useState<User | null>(DEFAULT_VALUE.user);
  const [token, setToken] = useState<string>(DEFAULT_VALUE.token);

  useEffect(() => {
    async function CallApiLocalStore() {
      const token = localStorage.getItem('gvlar');
      if (token) {
        const data = await checkToken(token);
        if (data && 'user' in data) {
          setUser(data.user);
          setToken(data.accessToken);
        }
      }
    }

    CallApiLocalStore();
  }, []);

  useEffect(() => {
    if (token === '') {
      localStorage.removeItem('gvlar');
    } else {
      localStorage.setItem('gvlar', token);
    }
  }, [token]);

  const value = useMemo(
    () => ({
      user,
      setUser,
      token,
      setToken,
    }),
    [user, token],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}
