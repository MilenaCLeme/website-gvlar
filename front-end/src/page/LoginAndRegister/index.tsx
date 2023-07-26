import { ChangeEvent, useContext, useEffect, useState } from 'react';
import style from './login.module.scss';
import Login from './Login';
import { Create, CreateUserClient, Login as LoginType, Message } from '@/types';
import Register from './Register';
import { register, login as serviceLogin } from '@/service/user';
import { firstWord, formatPhoneNumber } from '@/functions';
import { Context } from '@/context/Provider';
import { useNavigate } from 'react-router-dom';

const LoginAndRegister = () => {
  const navigate = useNavigate();
  const { getUser, setGetUser } = useContext(Context);

  const [message, setMessage] = useState<Message>({
    status: 0,
    message: '',
    type: '',
  });
  const [login, setLogin] = useState<LoginType>({
    email: '',
    password: '',
  });
  const [create, setCreate] = useState<Create>({
    name: '',
    phone: '',
    email: '',
    hashedPassword: '',
    confirmation: '',
  });

  useEffect(() => {
    if (getUser.user?.role) {
      navigate('/adm');
    }
  }, [getUser, navigate]);

  const handleLoginChange = ({ target: { value, name } }: ChangeEvent<HTMLInputElement>) => {
    setLogin({
      ...login,
      [name]: value,
    });
  };

  const handleCreateChange = ({ target: { value, name } }: ChangeEvent<HTMLInputElement>) => {
    if (name === 'phone') {
      value = formatPhoneNumber(value);
    }
    setCreate({
      ...create,
      [name]: value,
    });
  };

  const registerUser = async (check: boolean) => {
    if (check) {
      const newRegister: CreateUserClient = {
        name: create.name,
        email: create.email,
        hashedPassword: create.hashedPassword,
        phone: create.phone,
      };

      const data = await register(newRegister);

      if (data?.statusCode && data?.message) {
        setMessage({
          message: `${typeof data.message === 'object' ? data.message.join(' ') : data.message}`,
          status: data.statusCode,
          type: 'create',
        });
      }

      if (data?.user?.name) {
        setMessage({
          message: `Bem vindo, ${firstWord(
            data.user.name,
          )}! Seu cadastro foi realizado com sucesso! Enviamos um link de confirmação para seu e-mail`,
          status: 201,
          type: 'create',
        });

        setCreate({
          name: '',
          phone: '',
          email: '',
          hashedPassword: '',
          confirmation: '',
        });
      }
    }
  };

  const loginUser = async () => {
    const data = await serviceLogin(login);

    if (data?.statusCode && data?.message) {
      setMessage({
        message: `${typeof data.message === 'object' ? data.message.join(' ') : data.message}`,
        status: data.statusCode,
        type: 'login',
      });
    }

    if (data?.user?.name) {
      setGetUser({
        user: data.user,
        accessToken: data.accessToken,
      });

      navigate('/adm');
    }
  };

  return (
    <main className={style.main}>
      <h1 className={style.title}>Identificação</h1>
      <div className={style.container}>
        <Login
          login={login}
          message={message}
          loginUser={loginUser}
          handleChange={handleLoginChange}
        />
        <Register
          message={message}
          registerUser={registerUser}
          create={create}
          handleChange={handleCreateChange}
        />
      </div>
      <div className={style.img} />
    </main>
  );
};

export default LoginAndRegister;
