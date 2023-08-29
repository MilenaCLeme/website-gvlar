// import { useNavigate } from 'react-router-dom';
import LoginAndRegisterMobile from './LoginAndRegisterMobile';
import { FormEvent, useCallback, useState } from 'react';
import { CreateUser, Login, Message } from '@/types';
import Image from '@/img/login/imgLogin.png';
import style from './loginAndRegister.module.scss';

const LoginAndRegister = () => {
  // const navigate = useNavigate();

  const [message, _setMessage] = useState<Message>({} as Message);

  const [login, setLogin] = useState<Login>({} as Login);

  const [create, setCreate] = useState<CreateUser>({} as CreateUser);

  const handleLoginChange = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      setLogin({
        ...login,
        [e.currentTarget.name]: e.currentTarget.value,
      });
    },
    [login],
  );

  const handleCreateChange = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      const value =
        e.currentTarget.type === 'checkbox' ? e.currentTarget.checked : e.currentTarget.value;
      setCreate({
        ...create,
        [e.currentTarget.name]: value,
      });
    },
    [create],
  );

  const handleLoginUser = async () => {
    console.log('oi');
  };

  return (
    <div className={style.main}>
      <img src={Image} alt='imagem de um escritorio' className={style.img} />
      <LoginAndRegisterMobile
        login={login}
        handleLoginUser={handleLoginUser}
        handleLoginChange={handleLoginChange}
        message={message}
        create={create}
        handleCreateChange={handleCreateChange}
      />
    </div>
  );
};

export default LoginAndRegister;
