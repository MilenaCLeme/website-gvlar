import { decodeString } from '@/functions/decode';
import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Reset, Message as TypeMessage } from '@/types';
import { removeLettersAndLimit } from '@/functions/text';
import Input from '@/components/Input';
import { validatePassword } from '@/functions/validate';
import Button from '@/components/Button';
import style from './resetPassword.module.scss';
import '@/style/message.scss';
import classNames from 'classnames';
import { disabledResetPassword } from '@/functions/disabled';
import Message from '@/components/Message';
import { resetPassword } from '@/service/api/auth';
import { scrollToTop } from '@/functions/scroll';

const ResetPassword = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const inputRefs = {
    one: useRef<HTMLInputElement>(null),
    two: useRef<HTMLInputElement>(null),
    three: useRef<HTMLInputElement>(null),
    four: useRef<HTMLInputElement>(null),
  };

  const [reset, setReset] = useState<Reset>({} as Reset);
  const [message, setMessage] = useState<TypeMessage>({} as TypeMessage);

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (message.message) {
        setMessage({} as TypeMessage);
      }
    }, 10000);

    if (message.status === 201) {
      setTimeout(() => {
        navigate('/login');
      }, 8000);
    }
  }, [message, navigate]);

  useEffect(() => {
    if (id) {
      const decodeId = Number(decodeString(id));

      if (decodeId === 0 || !decodeId) {
        navigate('/');
      }
    }
  }, [id, navigate]);

  const handleResetChange = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      let value = e.currentTarget.value;
      const name = e.currentTarget.name;
      if (name === 'one' || name === 'two' || name === 'three' || name === 'four') {
        value = removeLettersAndLimit(value);
      }

      setReset({
        ...reset,
        [e.currentTarget.name]: value,
      });

      if (value !== '' && (name === 'one' || name === 'two' || name === 'three')) {
        const nextFieldName = name === 'one' ? 'two' : name === 'two' ? 'three' : 'four';
        const nextField = inputRefs[nextFieldName].current;
        console.log(nextField);
        if (nextField) {
          nextField.focus();
        }
      }
    },
    [reset, inputRefs],
  );

  const handleResetPasswordOnClick = async () => {
    let decodeId: number = 0;

    if (id) {
      decodeId = Number(decodeString(id));
    }

    const data = await resetPassword(decodeId, reset);

    setReset({} as Reset);

    if (data && 'message' in data) {
      setMessage({
        message: data.message,
        type: 'create',
        status: data.statusCode,
      });
    }

    if (data && 'sucess' in data) {
      setMessage({
        message:
          'Senha alterada com sucesso! Enviamos um e-mail de confirmação da alteração de senha. Você será redirecionado para a página inicial em alguns minutos',
        type: 'create',
        status: 201,
      });
    }
  };

  return (
    <section className={style.main}>
      <h1 className={style.title}>Redefinição de senha</h1>
      {message.type === 'create' && <Message mss={message} />}
      <form className={style.form}>
        <Input
          type='password'
          value={reset.password === undefined ? '' : reset.password}
          onChange={handleResetChange}
          name='password'
          id='password'
          label='Nova Senha:'
        />
        {!(reset.password === '') && !validatePassword(reset.password) && (
          <p className='message'>
            A senha deve ter no mínimo 6 caracteres e conter pelo menos 1 letra maiúscula e 1 letra
            minúscula.
          </p>
        )}
        <div className={style.margin} />
        <Input
          type='password'
          name='confirmation'
          id='confirmation'
          value={reset.confirmation === undefined ? '' : reset.confirmation}
          onChange={handleResetChange}
          label='Confirmação da senha:'
        />
        {!(reset.password === reset.confirmation) && !(reset.confirmation === '') && (
          <p className='message'>As senhas estão diferentes! Elas devem ser iguais.</p>
        )}
        <div className={style.margin} />
        <h2 className={style.subtitle}>
          Inserir o código recebido por e-mail para confirmar a identidade e redefinir a senha.
        </h2>
        <div className={style.box}>
          <Input
            type='text'
            maxLength={1}
            name='one'
            id='one'
            value={reset.one === undefined ? '' : reset.one}
            inputRef={inputRefs.one}
            onChange={handleResetChange}
            className={classNames({
              [style.active]: !(reset.one === '') && reset.one !== undefined,
            })}
          />
          <Input
            type='text'
            maxLength={1}
            name='two'
            id='two'
            inputRef={inputRefs.two}
            value={reset.two === undefined ? '' : reset.two}
            onChange={handleResetChange}
            className={classNames({
              [style.active]: !(reset.two === '') && reset.two !== undefined,
            })}
          />
          <Input
            type='text'
            name='three'
            id='three'
            maxLength={1}
            value={reset.three === undefined ? '' : reset.three}
            inputRef={inputRefs.three}
            onChange={handleResetChange}
            className={classNames({
              [style.active]: !(reset.three === '') && reset.three !== undefined,
            })}
          />
          <Input
            type='text'
            maxLength={1}
            name='four'
            id='four'
            value={reset.four === undefined ? '' : reset.four}
            inputRef={inputRefs.four}
            onChange={handleResetChange}
            className={classNames({
              [style.active]: !(reset.four === '') && reset.four !== undefined,
            })}
          />
        </div>
        <div className={style.margin} />
        <Button
          name='Alterar Senha'
          disabled={disabledResetPassword(reset)}
          onClick={() => handleResetPasswordOnClick()}
        />
      </form>
    </section>
  );
};

export default ResetPassword;
