import { Context } from '@/context';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Link from '@/components/Link';
import style from './nav.module.scss';

const Nav = () => {
  const { pathname } = useLocation();
  const { user } = useContext(Context);
  return (
    <nav className={style.nav}>
      <ul>
        <li>
          <Link name='Meus dados' to='/adm' action={pathname === '/adm'} />
        </li>
        <li>
          <Link name='Trocar a senha' to='/adm/senha' action={pathname === '/adm/senha'} />
        </li>
        <li>
          <Link name='Meus imóveis' to='/adm/imoveis' action={pathname === '/adm/imoveis'} />
        </li>
        {user && user?.role !== 'client' && (
          <li>
            <Link
              name='Painel ADM'
              to='/adm/controle'
              action={pathname === '/adm/controle' || pathname === '/adm/controle/usuario'}
            />
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
