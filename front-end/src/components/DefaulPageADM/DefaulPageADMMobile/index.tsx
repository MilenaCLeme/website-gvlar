import { useContext, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import style from './defaulPageADMMobile.module.scss';
import classNames from 'classnames';
import ReactModal from 'react-modal';
import Login from '@/assets/login/loginADMOrange.svg';
import Closet from '@/assets/menu/MenuCloset.svg';
import { Context } from '@/context';
import User from '@/assets/login/loginUserGray.svg';
import { firstWord } from '@/functions/text';
import Nav from '../components/Nav';

interface DefaulPageADMMobileProps {
  logoutLogin: () => Promise<void>;
}

const DefaulPageADMMobile: React.FC<DefaulPageADMMobileProps> = ({
  logoutLogin,
}: DefaulPageADMMobileProps) => {
  const { user } = useContext(Context);

  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  const isMobile = useMediaQuery({ maxWidth: 820 });

  const toggleModal = () => {
    setIsOpen(!modalIsOpen);
  };

  return (
    <>
      <button type='button' className={style.button} onClick={toggleModal}>
        <Login />
      </button>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={toggleModal}
        closeTimeoutMS={250}
        className={style.modal}
        contentLabel='ADM'
        style={{
          overlay: {
            backgroundColor: 'rgba(36,32,33,0.2)',
            visibility: isMobile ? 'visible' : 'hidden',
            zIndex: '3',
          },
        }}
      >
        <div
          className={classNames({ [style.openMenu]: modalIsOpen, [style.closeMenu]: !modalIsOpen })}
        >
          <button className={style.closet} type='button' onClick={toggleModal}>
            <Closet />
          </button>
          {user && (
            <div className={style.user}>
              <User />
              <h3>Olá, {firstWord(user.name)}</h3>
            </div>
          )}
          <Nav onClik={toggleModal} />
          <button type='button' onClick={() => logoutLogin()} className={style.button_closet}>
            <div />
            Sair
          </button>
        </div>
      </ReactModal>
    </>
  );
};

export default DefaulPageADMMobile;
