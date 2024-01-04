import { useNavigate } from 'react-router-dom';
import LoginAndRegisterMobile from './LoginAndRegisterMobile';
import { FormEvent, useCallback, useContext, useEffect, useState } from 'react';
import { CreateUser, CreateUserClient, Login, Message } from '@/types';
import Image from '@/img/login/imgLogin.png';
import style from './loginAndRegister.module.scss';
import { loginUser, registerUser, resendEmail } from '@/service/api/auth';
import { Context } from '@/context';
import { firstWord } from '@/functions/text';
import LoginAndRegisterDesk from './LoginAndRegisterDesk';
import { validateEmail } from '@/functions/validate';
import { scrollToTop } from '@/functions/scroll';

const LoginAndRegister = () => {
  const navigate = useNavigate();
  const { setUser, setToken } = useContext(Context);

  const [message, setMessage] = useState<Message>({} as Message);
  const [login, setLogin] = useState<Login>({} as Login);
  const [create, setCreate] = useState<CreateUser>({} as CreateUser);

  useEffect(() => {
    scrollToTop();
  }, []);

  const handleLoginChange = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      setLogin({
        ...login,
        [e.currentTarget.name]: e.currentTarget.value,
      });
    },
    [login],
  );

  useEffect(() => {
    setTimeout(() => {
      if (message.message) {
        setMessage({} as Message);
      }
    }, 10000);
  }, [message]);

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

  const handleLoginClick = async () => {
    const data = await loginUser(login);

    if (data && 'message' in data) {
      setMessage({ message: data.message, type: 'login', status: data.statusCode });
    }

    if (data && 'user' in data) {
      setUser(data.user);
      setToken(data.accessToken);

      navigate('/adm');
    }
  };

  const handleRegisterClick = async (body: CreateUserClient) => {
    const data = await registerUser(body);

    if (data && 'message' in data) {
      setMessage({ message: data.message, type: 'create', status: data.statusCode });
    }

    if (data && 'user' in data) {
      const text = `Bem vindo, ${firstWord(
        data.user.name,
      )}! Seu cadastro foi realizado com sucesso! Enviamos um link de confirmação para seu e-mail`;

      setMessage({ message: text, type: 'create', status: 201 });
    }

    setCreate({} as CreateUser);
  };

  const handleResendEmailClick = async () => {
    if (validateEmail(login.email)) {
      const data = await resendEmail(login.email);

      if (data && 'sucess' in data) {
        setMessage({ message: 'Mensagem enviada', status: 201, type: 'login' });
      }
    }
  };

  return (
    <div className={style.main}>
      <img src={Image} alt='imagem de um escritorio' className={style.img} />
      <LoginAndRegisterMobile
        login={login}
        handleLoginClick={handleLoginClick}
        handleLoginChange={handleLoginChange}
        message={message}
        create={create}
        handleCreateChange={handleCreateChange}
        handleRegisterClick={handleRegisterClick}
        handleResendEmailClick={handleResendEmailClick}
      />
      <LoginAndRegisterDesk
        login={login}
        handleLoginClick={handleLoginClick}
        handleLoginChange={handleLoginChange}
        message={message}
        create={create}
        handleCreateChange={handleCreateChange}
        handleRegisterClick={handleRegisterClick}
        handleResendEmailClick={handleResendEmailClick}
      />
    </div>
  );
};

export default LoginAndRegister;
