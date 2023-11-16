import { NavLink } from 'react-router-dom';
import style from './navFooter.module.scss';
import { useContext } from 'react';
import { Context } from '@/context';

const NavFooter = () => {
  const { user } = useContext(Context);
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
      <NavLink className={style.announce} to={user ? '/adm/imoveis' : '/login'}>
        Anuncie o seu imóvel
      </NavLink>
      <NavLink className={style.login} to={user ? '/adm' : '/login'}>
        <span>Minha conta</span>
        <div />
      </NavLink>
    </>
  );
};

export default NavFooter;
