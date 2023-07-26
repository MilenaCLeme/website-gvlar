import { NavLink } from 'react-router-dom';
import style from './header.module.scss';
import { useContext } from 'react';
import { Context } from '@/context/Provider';
import { firstWord } from '@/functions';

const Header = () => {
  const { getUser } = useContext(Context);
  return (
    <header className={style.header}>
      <nav className={style.nav}>
        <ul>
          <li>
            <NavLink to='/' className={style.link_home}>
              <div className={style.link_home__svg} />
              <div className={style.link_home__title}>home</div>
            </NavLink>
          </li>
          <div className={style.half}>
            <li>
              <NavLink to='/encontrar' className={style.link_filter}>
                <div className={style.link_filter__svg} />
                <div className={style.link_filter__title}>encontrar</div>
              </NavLink>
            </li>
            <div className={style.house} />
            <li className={style.link_create}>
              <NavLink to='/'>anunciar</NavLink>
            </li>
          </div>
          <li>
            <NavLink to='/login' className={style.link_login}>
              <div className={style.link_login__svg} />
              <div className={style.link_login__title}>
                {getUser.user?.name ? `${firstWord(getUser.user.name)}` : `entrar`}
              </div>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
