import { User } from '@/types';
import Input from '../Input';
import InputSelect from '../InputSelect';
import style from './FormUser.module.scss';
import { FormEvent, useContext } from 'react';
import { Context } from '@/context';

interface FormUserProps {
  form: User;
  handleFormUserChange: (e: FormEvent<HTMLInputElement | HTMLButtonElement>) => void;
}

const FormUser: React.FC<FormUserProps> = ({ form, handleFormUserChange }: FormUserProps) => {
  const { user } = useContext(Context);

  return (
    <form className={style.form}>
      <div className={style.box}>
        <Input
          type='text'
          value={form.name}
          onChange={handleFormUserChange}
          label='Nome Completo'
          name='name'
          className={style.one}
        />
        <Input
          type='text'
          value={form.phone}
          onChange={handleFormUserChange}
          label='Telefone'
          mask='phone'
          name='phone'
          className={style.one}
        />
      </div>
      <div className={style.box}>
        <Input
          type='text'
          className={style.email}
          value={form.email}
          onChange={handleFormUserChange}
          label='E-mail'
          name='email'
          disabled={true}
        />
        <div className={style.role}>
          <h4>Função</h4>
          <InputSelect
            iten='user'
            valeu={form.role}
            disabled={user?.role === 'worker' || form.role === 'master'}
            handleChange={handleFormUserChange}
          />
        </div>
      </div>
    </form>
  );
};

export default FormUser;
