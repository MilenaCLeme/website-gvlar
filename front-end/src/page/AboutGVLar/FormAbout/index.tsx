import Input from '@/components/Input';
import style from './formAbout.module.scss';
import Button from '@/components/Button';
import { FormEvent, useCallback, useState } from 'react';
import { validateEmail, validatePhone } from '@/functions/validate';
import { sendEmail } from '@/service/api/email';
import { Environment } from '@/env';

interface Form {
  name: string;
  phone: string;
  email: string;
  text: string;
  check: boolean;
}

const FormAbout = () => {
  const [form, setForm] = useState<Form>({} as Form);

  const handleFormChange = useCallback(
    (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm({
        ...form,
        [e.currentTarget.name]: e.currentTarget.value,
      });
    },
    [form],
  );

  const sendEmailAboutGVLar = async () => {
    const data = await sendEmail({
      name: form.name,
      email: form.email,
      phone: form.phone,
      subject: `Solicitação de contato`,
      text: form.text,
    });

    console.log(data);
  };

  return (
    <div className={style.form}>
      <Input
        type='text'
        name='name'
        placeholder='Nome*'
        onChange={handleFormChange}
        value={form.name === undefined ? '' : form.name}
      />
      <Input
        type='text'
        name='phone'
        placeholder='Telefone*'
        onChange={handleFormChange}
        value={form.phone === undefined ? '' : form.phone}
      />
      <Input
        type='text'
        name='email'
        placeholder='E-mail'
        onChange={handleFormChange}
        value={form.email === undefined ? '' : form.email}
      />
      <textarea
        className={style.textarea}
        name='text'
        placeholder='Mensagem*'
        onChange={handleFormChange}
        value={form.text === undefined ? '' : form.text}
      />
      <div className={style['box-botao-info']}>
        <div className={style['label_check']}>
          <p>Ao enviar você concorda com os</p>
          <a target='_blank' rel='noopener noreferrer' href={`${Environment.URL_DOMINIO}/termos`}>
            termos e condições de uso
          </a>
        </div>
        <Button
          disabled={form.name === '' || !validatePhone(form.phone) || !validateEmail(form.email)}
          name='Enviar'
          onClick={() => sendEmailAboutGVLar()}
        />
      </div>
    </div>
  );
};

export default FormAbout;
