import { Property, User } from '@/types';
import InputCheck from '../InputCheck';
import style from './table.module.scss';
import { FormEvent } from 'react';
import classNames from 'classnames';

interface TableProps {
  iten: 'property' | 'user';
  onChangeRadio?: (e: FormEvent<HTMLInputElement>) => void;
  idItem: number;
  properties?: Property[];
  users?: User[];
  about?: 'user' | 'adm';
}

const Table: React.FC<TableProps> = ({
  iten,
  properties,
  onChangeRadio,
  idItem,
  users,
  about,
}: TableProps) => {
  return (
    <table className={style.table}>
      <thead>
        <tr className={style.tr}>
          <td className={style.border}>ID</td>
          <td>{iten === 'user' ? 'Nome' : 'Imóvel'}</td>
          <td className={style.width}>{iten === 'user' ? 'Email' : 'Endereço'}</td>
          <td className={style.border_left}>{iten === 'user' ? 'Função' : 'Situação'}</td>
        </tr>
      </thead>
      <tbody>
        {properties &&
          properties.map(({ id, address, number, situation, business }) => (
            <tr key={id}>
              <td>
                <form>
                  <InputCheck
                    type='checkbox'
                    label={`${id}`}
                    value={`${id}`}
                    disabled={about === 'user' && situation === 'solicitação de exclusão'}
                    className={classNames({
                      [style.label]: true,
                      [style.disabled]: about === 'user' && situation === 'solicitação de exclusão',
                    })}
                    checked={idItem === id}
                    onChange={onChangeRadio}
                  />
                </form>
              </td>
              <td>{business === 'ambos' ? 'aluguel e venda' : business}</td>
              <td>{`${address} - ${number}`}</td>
              <td>{situation}</td>
            </tr>
          ))}
        {users &&
          users.map(({ id, name, email, role }) => (
            <tr key={id}>
              <td>
                <form>
                  <InputCheck
                    type='checkbox'
                    label={`${id}`}
                    value={`${id}`}
                    className={classNames({
                      [style.label]: true,
                    })}
                    checked={idItem === id}
                    onChange={onChangeRadio}
                  />
                </form>
              </td>
              <td>{name}</td>
              <td>{email}</td>
              <td>{role === 'client' ? 'Comum' : 'ADM'}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Table;
