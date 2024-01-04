import { Outlet, useLocation } from 'react-router-dom';
import Link from '../Link';
import Bell from '@/assets/onlyOne/bell.svg';
import style from './defaulPageADMMaster.module.scss';
import { useAxios } from '@/service/hook/use-axios';
import { useContext } from 'react';
import { Context } from '@/context';
import api from '@/service/api/axios-config';

const DefaulPageADMMaster = () => {
  const { pathname } = useLocation();
  const { token } = useContext(Context);

  const [data, _loading, _error, _sendData] = useAxios({
    axiosInstance: api,
    method: 'get',
    url: '/properties/situation/count',
    config: { headers: { Authorization: `Bearer ${token}` } },
  });

  return (
    <>
      <div className={style.main}>
        <div className={style.title}>
          {data > 0 && <Bell />}
          <h1>Bom Trabalho!</h1>
        </div>
        <nav className={style.nav}>
          <ul>
            <li>
              <Link
                name='Usuários'
                to='/adm/controle/usuario'
                action={pathname === '/adm/controle/usuario'}
              />
            </li>
            <li>
              <Link
                name='Imoveis'
                to='/adm/controle/imoveis'
                action={pathname === '/adm/controle/imoveis'}
              />
            </li>
          </ul>
        </nav>
      </div>
      <Outlet />
    </>
  );
};

export default DefaulPageADMMaster;
