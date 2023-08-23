import { NavLink } from 'react-router-dom';
import style from './navFooter.module.scss';

const NavFooter = () => {
  return (
    <>
      <NavLink className={style.home} to='/'>
        <div />
        <span>Home</span>
      </NavLink>
      <NavLink className={style.about} to='/'>
        Sobre nós
      </NavLink>
      <NavLink className={style.filter} to='/'>
        Encontre o seu imóvel
      </NavLink>
      <NavLink className={style.announce} to='/'>
        Anuncie o seu imóvel
      </NavLink>
      <NavLink className={style.login} to='/'>
        <span>Minha conta</span>
        <div />
      </NavLink>
    </>
  );
};

export default NavFooter;
