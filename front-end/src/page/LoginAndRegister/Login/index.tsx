import { NavLink } from 'react-router-dom';
import style from './login.module.scss';
import GVLar from '@/assets/loginandregister/logogvlarblack.svg';
import { Login as LoginType, Message } from '@/types';
import { ChangeEvent } from 'react';
import { validateEmail } from '@/functions';

interface LoginProps {
  login: LoginType;
  handleChange: ({ target: { value, name } }: ChangeEvent<HTMLInputElement>) => void;
  loginUser: () => Promise<void>;
  message: Message;
}

const Login: React.FC<LoginProps> = ({ login, handleChange, loginUser, message }: LoginProps) => {
  return (
    <section className={style.login}>
      <GVLar />
      <form className={style.login__form}>
        <h3>Já tenho cadastro</h3>
        {!(message.message === '') && message.type === 'login' && (
          <p className={style.login__message}>{message.message}</p>
        )}
        <label className={style.login__form__margin} htmlFor='email'>
          <input
            type='text'
            value={login.email}
            onChange={handleChange}
            name='email'
            id='emaillogin'
            placeholder='E-mail'
          />
          {!(login.email === '') && !validateEmail(login.email) && (
            <p className={style.login__form__alert}>E-mail inválido!</p>
          )}
        </label>
        <label htmlFor='password'>
          <input
            type='password'
            value={login.password}
            onChange={handleChange}
            name='password'
            id='password'
            placeholder='Senha'
          />
        </label>
        <NavLink to=''>Esqueci a senha</NavLink>
        <button
          type='button'
          disabled={login.email === '' || login.password === '' || !validateEmail(login.email)}
          onClick={() => loginUser()}
        >
          Entrar
        </button>
      </form>
    </section>
  );
};

export default Login;
