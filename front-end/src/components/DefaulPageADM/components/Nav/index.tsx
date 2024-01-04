import { Context } from '@/context';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Link from '@/components/Link';
import style from './nav.module.scss';

const Nav = ({ onClik }: { onClik?: () => void }) => {
  const { pathname } = useLocation();
  const { user } = useContext(Context);
  return (
    <nav className={style.nav}>
      <ul>
        <li>
          <Link
            name='Meus dados'
            to='/adm'
            action={pathname === '/adm'}
            onClick={onClik === undefined || pathname === '/adm' ? undefined : onClik}
          />
        </li>
        <li>
          <Link
            name='Atualizar a senha'
            to='/adm/senha'
            action={pathname === '/adm/senha'}
            onClick={onClik === undefined || pathname === '/adm/senha' ? undefined : onClik}
          />
        </li>
        <li>
          <Link
            name='Meus imóveis'
            to='/adm/imoveis'
            action={pathname === '/adm/imoveis'}
            onClick={onClik === undefined || pathname === '/adm/imoveis' ? undefined : onClik}
          />
        </li>
        {user && user?.role !== 'client' && (
          <li>
            <Link
              name='Painel ADM'
              to='/adm/controle'
              action={
                pathname === '/adm/controle' ||
                pathname === '/adm/controle/usuario' ||
                pathname === '/adm/controle/imoveis'
              }
              onClick={
                onClik === undefined ||
                pathname === '/adm/controle' ||
                pathname === '/adm/controle/usuario' ||
                pathname === '/adm/controle/imoveis'
                  ? undefined
                  : onClik
              }
            />
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
