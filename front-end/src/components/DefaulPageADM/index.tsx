import { firstWord } from '@/functions/text';
import DefaulPageADMMobile from './DefaulPageADMMobile';
import User from '@/assets/login/loginOnline.svg';
import { useContext } from 'react';
import { Context } from '@/context';
import Nav from './components/Nav';
import style from './defaulPageADM.module.scss';
import { Outlet, useNavigate } from 'react-router-dom';
import { logout } from '@/service/api/auth';

const DefaulPageADM = () => {
  const navigate = useNavigate();
  const { user, token, setToken, setUser } = useContext(Context);

  const logoutLogin = async () => {
    const data = await logout(token);

    if (data && 'sucess' in data) {
      setToken('');
      setUser(null);

      navigate('/login');
    }
  };

  return (
    <>
      <DefaulPageADMMobile logoutLogin={logoutLogin} />
      <div className={style.main}>
        <div className={style.box}>
          <div className={style.position}>
            {user && (
              <div className={style.box_all}>
                <div className={style.box_text}>
                  <User />
                  <h1>Olá, {firstWord(user.name)}</h1>
                </div>
                <button type='button' onClick={() => logoutLogin()} className={style.button}>
                  <div />
                  Sair
                </button>
              </div>
            )}
            <Nav />
          </div>
        </div>
        <section className={style.main_outlet}>
          <Outlet />
        </section>
      </div>
    </>
  );
};

export default DefaulPageADM;
