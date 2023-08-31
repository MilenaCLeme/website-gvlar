import Logo from '@/assets/gvlar/logoBlack.svg';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { CreateUser, CreateUserClient, Login, Message as MessageProps } from '@/types';
import { FormEvent, useState } from 'react';
import { NavLink } from 'react-router-dom';
import style from './loginAndRegisterMobile.module.scss';
import classNames from 'classnames';
import { validateEmail, validatePassword, validatePhone } from '@/functions/validate';
import InputCheck from '@/components/InputCheck';
import Message from '../Message';

interface LoginAndRegisterMobileProps {
  login: Login;
  handleLoginChange: (e: FormEvent<HTMLInputElement>) => void;
  message: MessageProps;
  create: CreateUser;
  handleCreateChange: (e: FormEvent<HTMLInputElement>) => void;
  handleLoginClick: () => Promise<void>;
  handleRegisterClick: (body: CreateUserClient) => Promise<void>;
  handleResendEmailClick: () => Promise<void>;
}

const LoginAndRegisterMobile: React.FC<LoginAndRegisterMobileProps> = ({
  login,
  handleLoginChange,
  message,
  create,
  handleCreateChange,
  handleLoginClick,
  handleRegisterClick,
  handleResendEmailClick,
}: LoginAndRegisterMobileProps) => {
  const [start, setStart] = useState<boolean>(false);

  return (
    <div className={style.main}>
      <h1 className={style.title}>Identificação</h1>
      <Logo />
      <form className={style.form}>
        <h3>Já tenho cadastro</h3>
        {!(message.message === '') && message.type === 'login' && (
          <Message mss={message} handleResendEmailClick={handleResendEmailClick} />
        )}
        <Input
          type='text'
          name='email'
          placeholder='E-mail'
          value={login.email === undefined ? '' : login.email}
          onChange={handleLoginChange}
        />
        <Input
          type='password'
          name='password'
          placeholder='Senha'
          value={login.password === undefined ? '' : login.password}
          onChange={handleLoginChange}
        />
        <NavLink to=''>Esqueci a senha</NavLink>
        <div>
          <Button
            name='Entrar'
            disabled={login.email === '' || login.password === '' || !validateEmail(login.email)}
            onClick={() => handleLoginClick()}
            className={style.button}
          />
        </div>
      </form>
      <div className={style.box}>
        <Button
          className={classNames({ [style.button_create]: true, [style.active]: start })}
          name='Cadastre-se'
          onClick={() => setStart(!start)}
        />
        {start && (
          <form className={style.box_form}>
            {!(message.message === '') && message.type === 'create' && <Message mss={message} />}
            <Input
              type='text'
              name='name'
              placeholder='Nome completo'
              value={create.name === undefined ? '' : create.name}
              onChange={handleCreateChange}
            />
            <Input
              type='text'
              name='phone'
              placeholder='Telefone'
              value={create.phone === undefined ? '' : create.phone}
              onChange={handleCreateChange}
              mask='phone'
            />
            <Input
              type='text'
              name='email'
              placeholder='E-mail'
              value={create.email === undefined ? '' : create.email}
              onChange={handleCreateChange}
            />
            <Input
              type='password'
              name='hashedPassword'
              placeholder='Senha'
              value={create.hashedPassword === undefined ? '' : create.hashedPassword}
              onChange={handleCreateChange}
            />
            {!validatePassword(create.hashedPassword) && (
              <p>
                A senha deve ter no mínimo 6 caracteres e conter pelo menos 1 letra maiúscula e 1
                letra minúscula.
              </p>
            )}
            <Input
              type='password'
              name='confirmation'
              placeholder='Confirme a senha'
              value={create.confirmation === undefined ? '' : create.confirmation}
              onChange={handleCreateChange}
            />
            {!(create.hashedPassword === create.confirmation) && !(create.confirmation === '') && (
              <p>As senhas estão diferentes! Elas devem ser iguais.</p>
            )}
            <div className={style.box_check}>
              <InputCheck
                className={style.label_check}
                type='checkbox'
                name='check'
                label={
                  <div>
                    <p>concordo com os</p>
                    <NavLink to='/'>termos e condições de uso</NavLink>
                  </div>
                }
                checked={create.check}
                onChange={handleCreateChange}
              />
              <Button
                disabled={
                  create.name === '' ||
                  !validatePhone(create.phone) ||
                  !validateEmail(create.email) ||
                  !(create.hashedPassword === create.confirmation) ||
                  !create.check ||
                  !validatePassword(create.hashedPassword)
                }
                name='Cadastrar'
                className={style.button}
                onClick={() =>
                  handleRegisterClick({
                    name: create.name,
                    email: create.email,
                    hashedPassword: create.hashedPassword,
                    phone: create.phone,
                  })
                }
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginAndRegisterMobile;
