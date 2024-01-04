import { NavLink } from 'react-router-dom';
import HeaderMobile from './HeaderMobile';
import style from './header.module.scss';
import { useContext } from 'react';
import { Context } from '@/context';
import { firstWord } from '@/functions/text';

const Header = () => {
  const { user } = useContext(Context);
  return (
    <header className={style.header}>
      <HeaderMobile />
      <nav className={style.nav}>
        <li>
          <NavLink className={style.home} to='/'>
            <div />
            <span>Home</span>
          </NavLink>
        </li>
        <div className={style.center}>
          <li>
            <NavLink className={style.filter} to='/encontrar/imovel'>
              <div />
              <span>Encontrar</span>
            </NavLink>
          </li>
          <div className={style.house} />
          <li>
            <NavLink className={style.announce} to={user ? '/adm/imoveis' : '/login'}>
              <span>Anunciar</span>
              <div />
            </NavLink>
          </li>
        </div>
        <li>
          <NavLink className={style.login} to={user ? '/adm' : '/login'}>
            <div />
            <span>{user ? firstWord(user.name) : 'Entrar'}</span>
          </NavLink>
        </li>
      </nav>
    </header>
  );
};

export default Header;
