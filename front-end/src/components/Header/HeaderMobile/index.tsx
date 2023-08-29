import { useState } from 'react';
import ReactModal from 'react-modal';
import Menu from '@/assets/menu/MenuOpen.svg';
import Closet from '@/assets/menu/MenuCloset.svg';
import style from './headerMobile.module.scss';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

ReactModal.setAppElement('#root');

const HeaderMobile = () => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  const isMobile = useMediaQuery({ maxWidth: 820 });

  const toggleModal = () => {
    setIsOpen(!modalIsOpen);
  };

  return (
    <>
      <button type='button' className={style.button_menu} onClick={toggleModal}>
        <Menu />
      </button>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={toggleModal}
        closeTimeoutMS={250}
        className={style.modal}
        contentLabel='Menu'
        style={{
          overlay: {
            backgroundColor: 'rgba(36,32,33,0.2)',
            visibility: isMobile ? 'visible' : 'hidden',
            zIndex: '2',
          },
        }}
      >
        <div
          className={classNames({ [style.openMenu]: modalIsOpen, [style.closeMenu]: !modalIsOpen })}
        >
          <button className={style.button_closet} type='button' onClick={toggleModal}>
            <Closet />
          </button>
          <nav className={style.nav}>
            <li>
              <NavLink className={style.home} to='/'>
                <div />
                <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink className={style.filter} to='/'>
                <div />
                <span>Encontrar</span>
              </NavLink>
            </li>
            <li>
              <NavLink className={style.announce} to='/'>
                <div />
                <span>Anunciar</span>
              </NavLink>
            </li>
            <li>
              <NavLink className={style.login} to='/'>
                <div />
                <span>Entrar</span>
              </NavLink>
            </li>
          </nav>
        </div>
      </ReactModal>
    </>
  );
};

export default HeaderMobile;
