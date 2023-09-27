import { InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import style from './inputSearch.module.scss';
import classNames from 'classnames';

interface InputSearchProps extends InputHTMLAttributes<HTMLInputElement> {}

const InputSearch: React.FC<InputSearchProps> = ({ ...props }: InputSearchProps) => {
  const inputRef = useRef<HTMLLabelElement>(null);
  const [click, setClick] = useState(false);

  useEffect(() => {
    const handleClickFora = (event: MouseEvent) => {
      if (inputRef.current && inputRef.current.contains(event.target as Node)) {
        setClick(true);
      } else {
        setClick(false);
      }
    };

    document.addEventListener('click', handleClickFora);

    return () => {
      document.removeEventListener('click', handleClickFora);
    };
  }, []);

  return (
    <label
      ref={inputRef}
      className={classNames({ [style.search]: true, [style.active]: click })}
      htmlFor={props.name || props.id}
    >
      <div />
      <input {...props} />
    </label>
  );
};

export default InputSearch;
