import { FormEvent, useEffect, useRef, useState } from 'react';
import style from './inputSelect.module.scss';
import classNames from 'classnames';
import ArrowBlack from '@/assets/arrow/arrowGvBlack.svg';
import ArrowOrange from '@/assets/arrow/arrowGvOrange.svg';

interface Option {
  value: string;
  label: string;
}

interface InputSelectProps {
  valeu?: string;
  handleChange: (e: FormEvent<HTMLButtonElement>) => void;
}

const InputSelect: React.FC<InputSelectProps> = ({ valeu, handleChange }: InputSelectProps) => {
  const inputRef = useRef<HTMLDivElement>(null);
  const [open, setOPen] = useState<boolean>(false);

  const options: Option[] = [
    { value: 'Apartamento', label: 'Apartamento' },
    { value: 'Casa Térreo', label: 'Casa Térreo' },
    { value: 'Sobrado', label: 'Sobrado' },
    { value: 'Galpão', label: 'Galpão' },
    { value: 'Terreno', label: 'Terreno' },
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
    <div className={style.div} ref={inputRef}>
      <button
        className={classNames({ [style.select]: true, [style.open]: open })}
        name='select'
        type='button'
      >
        {valeu === '' ? 'Imovél' : valeu}
        {open ? <ArrowOrange /> : <ArrowBlack />}
      </button>
      <div className={classNames({ [style.options]: open, [style.closet]: !open })}>
        {open &&
          options.map(({ label }, index) => (
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
      </div>
    </div>
  );
};

export default InputSelect;
