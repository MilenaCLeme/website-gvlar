import { Property, User } from '@/types';
import InputCheck from '../InputCheck';
import style from './table.module.scss';
import { FormEvent } from 'react';

interface TableProps {
  iten: 'property' | 'user';
  onChangeRadio: (e: FormEvent<HTMLInputElement>) => void;
  properties?: Property[];
  idProperty?: number;
  users?: User[];
}

const Table: React.FC<TableProps> = ({
  iten,
  properties,
  onChangeRadio,
  idProperty,
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
                    className={style.label}
                    checked={idProperty === id}
                    onChange={onChangeRadio}
                  />
                </form>
              </td>
              <td>{business}</td>
              <td>{`${address} - ${number}`}</td>
              <td>{situation}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Table;
