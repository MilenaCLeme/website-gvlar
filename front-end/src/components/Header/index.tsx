import { NavLink } from 'react-router-dom';
import HeaderMobile from './HeaderMobile';
import style from './header.module.scss';

const Header = () => {
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
            <NavLink className={style.filter} to='/'>
              <div />
              <span>Encontrar</span>
            </NavLink>
          </li>
          <div className={style.house} />
          <li>
            <NavLink className={style.announce} to='/'>
              <span>Anunciar</span>
              <div />
            </NavLink>
          </li>
        </div>
        <li>
          <NavLink className={style.login} to='/'>
            <div />
            <span>Entrar</span>
          </NavLink>
        </li>
      </nav>
    </header>
  );
};

export default Header;
