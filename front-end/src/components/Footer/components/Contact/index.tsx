import { NavLink } from 'react-router-dom';
import style from './contact.module.scss';

const Contact = () => {
  return (
    <NavLink className={style.contact} to='/'>
      <div />
      <span>contato</span>
    </NavLink>
  );
};

export default Contact;
