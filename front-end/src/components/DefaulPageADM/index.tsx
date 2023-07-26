import IconLogin from '@/assets/adm/login.svg';
import { Context } from '@/context/Provider';
import { firstWord } from '@/functions';
import { useContext, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import style from './defaulPageADM.module.scss';

const DefaulPageADM = () => {
  const navigate = useNavigate();
  const { getUser } = useContext(Context);

  useEffect(() => {
    if (!getUser.user?.role) {
      navigate('/login');
    }
  }, [getUser, navigate]);

  return (
    <main className={style.container}>
      <div className={style.container__title}>
        <IconLogin />
        {getUser.user?.name && <h1>Olá, {firstWord(getUser.user.name)}</h1>}
        <button className={style.container__title__button}>
          <div className={style.container__title__button__svg} />
          Sair
        </button>
      </div>
      <div className={style.container__display}>
        <section className={style.menu}>
          <nav>
            <ul>
              <li>
                <NavLink to='/'>Meus Dados</NavLink>
              </li>
              <li>
                <NavLink to='/'>Trocar a senha</NavLink>
              </li>
              <li>
                <NavLink to='/'>Meus Imóveis</NavLink>
              </li>
              {getUser.user?.role === 'worker' ||
                (getUser.user?.role === 'master' && (
                  <li>
                    <NavLink to='/'>Painel Admin</NavLink>
                  </li>
                ))}
            </ul>
          </nav>
        </section>
        <div className={style.main}>
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default DefaulPageADM;
