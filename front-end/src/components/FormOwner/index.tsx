import { Owner, Owners } from '@/types';
import Input from '../Input';
import Button from '../Button';
import ButtonDelete from '../ButtonDelete';
import style from './formOwner.module.scss';
import { FormEvent } from 'react';
import { validateEmail, validatePhone } from '@/functions/validate';
import Message from '../Message';
import { Message as TypeMessage } from '@/types';

interface FormOwnerProps {
  owners: Owners[];
  handleOwnerChange: (e: FormEvent<HTMLInputElement>) => void;
  owner: Owner;
  handleCreateOwnerOnClick: () => Promise<void>;
  handleDeleteOwnerOnClick: (id: number) => Promise<void>;
  message: TypeMessage;
}

const FormOwner: React.FC<FormOwnerProps> = ({
  owners,
  owner,
  handleOwnerChange,
  handleCreateOwnerOnClick,
  handleDeleteOwnerOnClick,
  message,
}: FormOwnerProps) => {
  return (
    <form className={style.form}>
      <h2 className={style.subtitle}>Proprietário</h2>
      {message.type === 'owner' && <Message mss={message} />}
      {owners.map(({ owner: { name, id, phone, email } }) => (
        <div key={id}>
          <div className={style.flex}>
            <Input
              className={style.one}
              value={name}
              id={`${id}`}
              name='name'
              label='Nome Completo'
              disabled={true}
              onChange={() => console.log('')}
            />
            <Input
              className={style.two}
              value={phone}
              id={`${id}`}
              name='phone'
              label='Telefone'
              disabled={true}
              onChange={() => console.log('')}
            />
          </div>
          <div className={style.flex}>
            <Input
              className={style.three}
              value={email}
              label='E-mail'
              disabled={true}
              onChange={() => console.log('')}
            />
            <div className={style.box}>
              {/*
                <Button name='Alterar' onClick={() => console.log('oii')} />
            */}
              <ButtonDelete name='Excluir' onClick={() => handleDeleteOwnerOnClick(id)} />
            </div>
          </div>
        </div>
      ))}
      <>
        <div className={style.flex}>
          <Input
            className={style.one}
            name='name'
            label='Nome Completo'
            value={owner.name === undefined ? '' : owner.name}
            onChange={handleOwnerChange}
          />
          <Input
            className={style.two}
            name='phone'
            label='Telefone'
            mask='phone'
            value={owner.phone === undefined ? '' : owner.phone}
            onChange={handleOwnerChange}
          />
        </div>
        <div className={style.flex}>
          <Input
            className={style.three}
            name='email'
            label='E-mail'
            value={owner.email === undefined ? '' : owner.email}
            onChange={handleOwnerChange}
          />
          <Button
            name='Cadastrar'
            disabled={
              owner.name === '' || !validatePhone(owner.phone) || !validateEmail(owner.email)
            }
            onClick={() => handleCreateOwnerOnClick()}
          />
        </div>
      </>
    </form>
  );
};

export default FormOwner;
