import { FormEvent, useEffect, useRef, useState } from 'react';
import style from './inputSelect.module.scss';
import classNames from 'classnames';
import ArrowBlack from '@/assets/arrow/arrowGvBlack.svg';
import ArrowOrange from '@/assets/arrow/arrowGvOrange.svg';
import { transformText } from '@/functions/text';

interface Option {
  value: string;
  label: string;
}

interface InputSelectProps {
  iten: 'property' | 'user' | 'adm' | 'order';
  valeu?: string;
  handleChange: (e: FormEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

const InputSelect: React.FC<InputSelectProps> = ({
  iten,
  valeu,
  handleChange,
  disabled,
}: InputSelectProps) => {
  const inputRef = useRef<HTMLDivElement>(null);
  const [open, setOPen] = useState<boolean>(false);

  const optionsProperty: Option[] = [
    { value: 'Apartamento', label: 'Apartamento' },
    { value: 'Casa Térreo', label: 'Casa Térreo' },
    { value: 'Sobrado', label: 'Sobrado' },
    { value: 'Galpão', label: 'Galpão' },
    { value: 'Terreno', label: 'Terreno' },
  ];

  const optionsUser: Option[] = [
    { value: 'client', label: 'Comum' },
    { value: 'worker', label: 'ADM' },
  ];

  const optionsAdm: Option[] = [
    { value: 'liberado', label: 'liberado' },
    { value: 'em analise', label: 'em analise' },
    { value: 'solicitação de exclusão', label: 'solicitação de exclusão' },
    { value: 'vendeu', label: 'vendeu' },
    { value: 'alugado', label: 'alugado' },
  ];

  const optinosOrder: Option[] = [
    { value: '', label: 'Ordenar' },
    { value: 'Preço Menor', label: 'Preço Menor' },
    { value: 'Preço Maior', label: 'Preço Maior' },
  ];

  useEffect(() => {
    const handleClickFora = (event: MouseEvent) => {
      if (inputRef.current && inputRef.current.contains(event.target as Node)) {
        setOPen(!open);
      } else {
        setOPen(false);
      }
    };

    document.addEventListener('click', handleClickFora);

    return () => {
      document.removeEventListener('click', handleClickFora);
    };
  }, [open]);

  return (
    <div className={classNames({ [style.div]: true, [style.adm]: iten === 'adm' })} ref={inputRef}>
      <button
        className={classNames({ [style.select]: true, [style.open]: open })}
        name='select'
        type='button'
        disabled={disabled}
      >
        {transformText(valeu, iten)}
        {open ? <ArrowOrange /> : <ArrowBlack />}
      </button>
      <div
        className={classNames({
          [style.options]: open,
          [style.closet]: !open,
          [style.user]: iten === 'user',
          [style.order]: iten === 'order',
        })}
      >
        {open &&
          iten === 'property' &&
          optionsProperty.map(({ label }, index) => (
            <button
              onClick={(e: FormEvent<HTMLButtonElement>) => {
                handleChange(e);
                setOPen(false);
              }}
              key={index}
              type='button'
              name='about'
              value={label}
            >
              {label}
            </button>
          ))}
        {open &&
          iten === 'user' &&
          optionsUser.map(({ label, value }, index) => (
            <button
              onClick={(e: FormEvent<HTMLButtonElement>) => {
                handleChange(e);
                setOPen(false);
              }}
              key={index}
              type='button'
              name='role'
              value={value}
            >
              {label}
            </button>
          ))}
        {open &&
          iten === 'adm' &&
          optionsAdm.map(({ label, value }, index) => (
            <button
              onClick={(e: FormEvent<HTMLButtonElement>) => {
                handleChange(e);
                setOPen(false);
              }}
              key={index}
              type='button'
              name='situation'
              value={value}
            >
              {label}
            </button>
          ))}
        {open &&
          iten === 'order' &&
          optinosOrder.map(({ label, value }, index) => (
            <button
              onClick={(e: FormEvent<HTMLButtonElement>) => {
                handleChange(e);
                setOPen(false);
              }}
              key={index}
              type='button'
              name='order'
              value={value}
            >
              {label}
            </button>
          ))}
      </div>
    </div>
  );
};

export default InputSelect;
