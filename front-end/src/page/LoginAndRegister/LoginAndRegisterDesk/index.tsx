import { CreateUser, CreateUserClient, Login, Message as MessageProps } from '@/types';
import { FormEvent } from 'react';
import Logo from '@/assets/gvlar/logoBlack.svg';
import Message from '@/components/Message';
import Input from '@/components/Input';
import { NavLink } from 'react-router-dom';
import Button from '@/components/Button';
import { validateEmail, validatePassword, validatePhone } from '@/functions/validate';
import InputCheck from '@/components/InputCheck';
import style from './loginAndRegisterDesk.module.scss';
import '@/style/message.scss';
import { Environment } from '@/env';

interface LoginAndRegisterDeskProps {
  login: Login;
  handleLoginChange: (e: FormEvent<HTMLInputElement>) => void;
  message: MessageProps;
  create: CreateUser;
  handleCreateChange: (e: FormEvent<HTMLInputElement>) => void;
  handleLoginClick: () => Promise<void>;
  handleRegisterClick: (body: CreateUserClient) => Promise<void>;
  handleResendEmailClick: () => Promise<void>;
}

const LoginAndRegisterDesk: React.FC<LoginAndRegisterDeskProps> = ({
  create,
  handleCreateChange,
  handleLoginChange,
  handleLoginClick,
  handleRegisterClick,
  login,
  message,
  handleResendEmailClick,
}: LoginAndRegisterDeskProps) => {
  return (
    <div className={style.main}>
      <div className={style.box_logo}>
        <h1>Identificação</h1>
        <Logo />
      </div>
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
        <NavLink to='/verificar/email'>Esqueci a senha</NavLink>
        <div className={style.box_button}>
          <Button
            name='Entrar'
            disabled={login.email === '' || login.password === '' || !validateEmail(login.email)}
            onClick={() => handleLoginClick()}
          />
        </div>
      </form>
      <div className={style.box_create}>
        <h3>Cadastre-se</h3>
        <form>
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
            <p className='message'>
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
            <p className='message'>As senhas estão diferentes! Elas devem ser iguais.</p>
          )}
          <div className={style.box_check}>
            <InputCheck
              className={style.label_check}
              type='checkbox'
              name='check'
              id='check'
              label={
                <div>
                  <p>concordo com os</p>
                  <a
                    target='_blank'
                    rel='noopener noreferrer'
                    href={`${Environment.URL_DOMINIO}/termos`}
                  >
                    termos e condições de uso
                  </a>
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
      </div>
    </div>
  );
};

export default LoginAndRegisterDesk;
