import { NavLink } from 'react-router-dom';
import MegaPhoneOrange from '@/assets/megaphone/megaphoneOrange.svg';
import style from './buttonPhone.module.scss';
import { useContext } from 'react';
import { Context } from '@/context';

const ButtonPhone = () => {
  const { user } = useContext(Context);
  return (
    <NavLink to={user ? '/adm/imoveis' : '/login'} className={style.button}>
      Anunciar
      <MegaPhoneOrange />
    </NavLink>
  );
};

export default ButtonPhone;
