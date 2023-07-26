import { Create, Message } from '@/types';
import style from './register.module.scss';
import { ChangeEvent, useRef, useState } from 'react';
import ReactInputMask from 'react-input-mask';
import CheckBox from '@/components/CheckBox';
import { NavLink } from 'react-router-dom';
import { validPassword, validateEmail, validatePhone } from '@/functions';
import classNames from 'classnames';

interface RegisterProps {
  create: Create;
  handleChange: ({ target: { value, name } }: ChangeEvent<HTMLInputElement>) => void;
  registerUser: (check: boolean) => Promise<void>;
  message: Message;
}

const Register: React.FC<RegisterProps> = ({
  create,
  handleChange,
  registerUser,
  message,
}: RegisterProps) => {
  const [check, setCheck] = useState<boolean>(false);
  const [mask, setMask] = useState<string>('(99) 99999-9999');
  const inputRef = useRef(null);

  const handleBlur = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.replace('_', '');
    if (inputValue.length === 14) {
      setMask('(99) 9999-9999');
    }
  };

  const handleFocus = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.replace('_', '');
    if (inputValue.length === 14) {
      setMask('(99) 99999-9999');
    }
  };

  return (
    <section className={style.register}>
      <h3>Cadastro</h3>
      {!(message.message === '') && message.type === 'create' && (
        <p
          className={classNames({
            [style.register__message]: true,
            [style.register__message__alert]: !(message.status === 201),
            [style.register__message__ok]: message.status === 201,
          })}
        >
          {message.message}
        </p>
      )}
      <form className={style.register__form}>
        <label htmlFor='name'>
          <input
            type='text'
            value={create.name}
            onChange={handleChange}
            name='name'
            id='name'
            placeholder='Nome completo'
          />
        </label>
        <label htmlFor='phone'>
          <ReactInputMask
            type='text'
            value={create.phone}
            onChange={handleChange}
            mask={mask}
            ref={inputRef}
            onBlur={handleBlur}
            onFocus={handleFocus}
            name='phone'
            id='phone'
            placeholder='Telefone'
          />
        </label>
        <label htmlFor='email'>
          <input
            type='text'
            value={create.email}
            onChange={handleChange}
            name='email'
            id='email'
            placeholder='E-mail'
          />
          {!(create.email === '') && !validateEmail(create.email) && (
            <p className={style.register__form__alert}>E-mail inválido!</p>
          )}
        </label>
        <label htmlFor='hashedPassword'>
          <input
            type='password'
            value={create.hashedPassword}
            onChange={handleChange}
            name='hashedPassword'
            id='hashedPassword'
            placeholder='Senha'
          />
          {!(create.hashedPassword === '') && !validPassword(create.hashedPassword) && (
            <p className={style.register__form__alert}>
              A senha deve ter no mínimo 6 caracteres e conter pelo menos 1 letra maiúscula e 1
              letra minúscula.
            </p>
          )}
        </label>
        <label htmlFor='confirmation'>
          <input
            type='password'
            name='confirmation'
            id='confirmation'
            value={create.confirmation}
            onChange={handleChange}
            placeholder='Confirmação de Senha'
          />
          {!(create.hashedPassword === create.confirmation) && !(create.confirmation === '') && (
            <p className={style.register__form__alert}>
              As senhas estão diferentes! Elas devem ser iguais.
            </p>
          )}
        </label>
        <div className={style.register__form__box}>
          <div className={style.register__form__click}>
            <CheckBox
              label={
                <div className={style.register__form__click__div}>
                  <p>
                    concordo com os{' '}
                    <NavLink to='/'>termos de uso e política de privacidade</NavLink>
                  </p>
                </div>
              }
              checked={check}
              onChange={setCheck}
            />
          </div>
          <button
            type='button'
            disabled={
              create.name === '' ||
              !validatePhone(create.phone) ||
              !validateEmail(create.email) ||
              !(create.hashedPassword === create.confirmation) ||
              !check ||
              !validPassword(create.hashedPassword)
            }
            onClick={() => registerUser(check)}
          >
            Cadastrar
          </button>
        </div>
      </form>
    </section>
  );
};

export default Register;
