import { NavLink } from 'react-router-dom';
import MegaPhoneOrange from '@/assets/megaphone/megaphoneOrange.svg';
import style from './buttonPhone.module.scss';

const ButtonPhone = () => {
  return (
    <NavLink to='/' className={style.button}>
      Anunciar
      <MegaPhoneOrange />
    </NavLink>
  );
};

export default ButtonPhone;
