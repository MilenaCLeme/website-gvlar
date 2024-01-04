import { NavLink } from 'react-router-dom';
import style from './contact.module.scss';

const Contact = () => {
  return (
    <NavLink className={style.contact} to='/sobrenos'>
      <div />
      <span>contato</span>
    </NavLink>
  );
};

export default Contact;
