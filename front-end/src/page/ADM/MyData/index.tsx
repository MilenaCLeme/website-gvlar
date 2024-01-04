import Button from '@/components/Button';
import Input from '@/components/Input';
import { Context } from '@/context';
import { validatePhone } from '@/functions/validate';
import { updateUser } from '@/service/api/auth';
import { Message as MessageType } from '@/types';
import { FormEvent, useCallback, useContext, useEffect, useState } from 'react';
import style from './myData.module.scss';
import Message from '@/components/Message';
import { scrollToTop } from '@/functions/scroll';

interface Form {
  name: string;
  phone: string;
  email: string;
}

const MyData = () => {
  const { user, token, setUser } = useContext(Context);
  const [form, setForm] = useState<Form>({} as Form);
  const [message, setMessage] = useState<MessageType>({} as MessageType);

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name,
        phone: user.phone,
        email: user.email,
      });
    }
  }, [user]);

  const handleFormChange = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      setForm({
        ...form,
        [e.currentTarget.name]: e.currentTarget.value,
      });
    },
    [form],
  );

  const handleUpdateClick = async () => {
    const data = await updateUser(token, { name: form.name, phone: form.phone });

    if (data && 'message' in data) {
      setMessage({ message: data.message, status: data.statusCode, type: 'create' });
    }

    if (data && 'phone' in data) {
      setMessage({ message: 'Atualizado com sucesso', status: 201, type: 'create' });
      setUser({ ...data });
    }
  };

  return (
    <>
      <form className={style.form}>
        {!(message.message === '') && <Message mss={message} />}
        <Input
          type='text'
          name='name'
          placeholder='Nome completo'
          value={form.name === undefined ? '' : form.name}
          onChange={handleFormChange}
        />
        <Input
          type='text'
          name='phone'
          placeholder='Telefone'
          value={form.phone === undefined ? '' : form.phone}
          onChange={handleFormChange}
          mask='phone'
        />
        <Input
          type='text'
          onChange={handleFormChange}
          value={form.email === undefined ? '' : form.email}
          name='email'
          placeholder='E-mail'
          disabled={true}
        />
        {user && (
          <div className={style.button}>
            <Button
              name='Salvar'
              disabled={
                (form.name === user.name && form.phone === user.phone) ||
                !validatePhone(form.phone) ||
                form.name === ''
              }
              onClick={() => handleUpdateClick()}
            />
          </div>
        )}
      </form>
    </>
  );
};

export default MyData;
