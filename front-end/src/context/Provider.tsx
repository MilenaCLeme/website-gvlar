import { checkTokenValidity } from '@/service/user';
import { GetUser } from '@/types';
import { ReactNode, createContext, useEffect, useMemo, useState } from 'react';

type PropsContext = {
  getUser: GetUser;
  setGetUser: React.Dispatch<React.SetStateAction<GetUser>>;
};

const DEFAULT_VALUE = {
  getUser: {
    accessToken: '',
    user: {},
  },
  setGetUser: () => {
    // Start func Area
  },
};

export const Context = createContext<PropsContext>(DEFAULT_VALUE);

interface AuxProps {
  children: ReactNode;
}

export function ContextProvider({ children }: AuxProps) {
  const [getUser, setGetUser] = useState<GetUser>(DEFAULT_VALUE.getUser);

  useEffect(() => {
    async function CallApiLocalStore() {
      const token = localStorage.getItem('gvlar');
      if (token) {
        const data = await checkTokenValidity(token);
        setGetUser({
          accessToken: data?.accessToken,
          user: data?.user,
        });
      }
    }

    CallApiLocalStore();
  }, []);

  useEffect(() => {
    if (getUser.accessToken === '') {
      localStorage.removeItem('gvlar');
    }

    if (getUser.accessToken && !(getUser.accessToken === '')) {
      localStorage.setItem('gvlar', getUser.accessToken);
    }
  }, [getUser]);

  const value = useMemo(
    () => ({
      getUser,
      setGetUser,
    }),
    [getUser],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}
