import Button from '@/components/Button';
import Input from '@/components/Input';
import Message from '@/components/Message';
import { Context } from '@/context';
import { validatePassword } from '@/functions/validate';
import { changePassword } from '@/service/api/auth';
import { Message as MessageType } from '@/types';
import { FormEvent, useCallback, useContext, useEffect, useState } from 'react';
import style from './changePassword.module.scss';
import '@/style/message.scss';
import { scrollToTop } from '@/functions/scroll';

interface Form {
  passwordOld: string;
  passwordNew: string;
  confirmation: string;
}

const ChangePassword = () => {
  const { token, setUser } = useContext(Context);
  const [form, setForm] = useState({} as Form);
  const [message, setMessage] = useState({} as MessageType);

  useEffect(() => {
    scrollToTop();
  }, []);

  const handleFormChange = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      setForm({
        ...form,
        [e.currentTarget.name]: e.currentTarget.value,
      });
    },
    [form],
  );

  const handlePasswordNewClick = async () => {
    const data = await changePassword(token, {
      passwordNew: form.passwordNew,
      passwordOld: form.passwordOld,
    });

    if (data && 'message' in data) {
      setMessage({ message: data.message, status: data.statusCode, type: 'create' });
    }

    if (data && 'email' in data) {
      setMessage({ message: 'Atualizado com sucesso', status: 201, type: 'create' });
      setUser({ ...data });
    }
  };

  return (
    <form className={style.form}>
      {!(message.message === '') && <Message mss={message} />}
      <Input
        type='password'
        name='passwordOld'
        placeholder='Senha antiga'
        value={form.passwordOld === undefined ? '' : form.passwordOld}
        onChange={handleFormChange}
      />
      <Input
        type='password'
        name='passwordNew'
        placeholder='Nova senha'
        value={form.passwordNew === undefined ? '' : form.passwordNew}
        onChange={handleFormChange}
      />
      {!validatePassword(form.passwordNew) && (
        <p className='message'>
          A senha deve ter no mínimo 6 caracteres e conter pelo menos 1 letra maiúscula e 1 letra
          minúscula.
        </p>
      )}
      <Input
        type='password'
        name='confirmation'
        placeholder='Confirme a nova senha'
        value={form.confirmation === undefined ? '' : form.confirmation}
        onChange={handleFormChange}
      />
      {!(form.passwordNew === form.confirmation) &&
        !((form.confirmation === undefined ? '' : form.confirmation) === '') && (
          <p className='message'>As senhas estão diferentes! Elas devem ser iguais.</p>
        )}
      <div className={style.button}>
        <Button
          name='Salvar'
          disabled={
            !(form.passwordNew === form.confirmation) ||
            !validatePassword(form.passwordNew) ||
            form.confirmation === '' ||
            form.passwordOld === ''
          }
          onClick={() => handlePasswordNewClick()}
        />
      </div>
    </form>
  );
};

export default ChangePassword;
