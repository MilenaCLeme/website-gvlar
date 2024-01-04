import Button from '@/components/Button';
import Input from '@/components/Input';
import Message from '@/components/Message';
import { validateEmail } from '@/functions/validate';
import { forgetPassword } from '@/service/api/auth';
import { Message as TypeMessage } from '@/types';
import { FormEvent, useEffect, useState } from 'react';
import style from './forgetPassword.module.scss';
import { scrollToTop } from '@/functions/scroll';

const ForgetPassword = () => {
  const [email, setEmail] = useState<string>('');
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
  }, [message]);

  const sendEmailForForgetPassword = async () => {
    const data = await forgetPassword(email);

    if (data && 'message' in data) {
      setMessage({
        message: `${
          data.statusCode === 401
            ? 'Não há conta registrada com este e-mail. Verifique ou crie uma nova conta'
            : data.message
        }`,
        type: 'create',
        status: data.statusCode,
      });
    }

    if (data && 'sucess' in data) {
      setMessage({ message: 'Mensagem enviada com sucesso', type: 'create', status: 201 });
    }

    setEmail('');
  };

  return (
    <section className={style.main}>
      <h1 className={style.title}>Redefinição de Senha por E-mail</h1>
      <p className={style.subtitle}>
        O link para redefinir sua senha será enviado para o e-mail que você forneceu. Por favor,
        verifique sua caixa de entrada e, se não encontrar o e-mail, verifique também a pasta de
        spam ou lixo eletrônico
      </p>
      {message.type === 'create' && <Message mss={message} />}
      <form className={style.form}>
        <Input
          type='text'
          value={email}
          onChange={(e: FormEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)}
          name='email'
          id='emaillogin'
          label='E-mail:'
        />
        <Button
          name='Enviar e-mail'
          disabled={!validateEmail(email)}
          onClick={() => sendEmailForForgetPassword()}
        />
      </form>
    </section>
  );
};

export default ForgetPassword;
