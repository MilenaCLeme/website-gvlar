import { InputHTMLAttributes, useCallback } from 'react';
import style from './input.module.scss';
import { cep, currency, phone } from './mask';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  mask?: 'cep' | 'currency' | 'phone';
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ mask, onChange, ...props }: InputProps) => {
  const handleKeyUp = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      let modifiedValue = e;
      if (mask === 'phone') {
        modifiedValue = phone(e);
      }
      if (mask === 'cep') {
        modifiedValue = cep(e);
      }
      if (mask === 'currency') {
        modifiedValue = currency(e);
      }

      onChange(modifiedValue);
    },
    [mask, onChange],
  );

  return (
    <label htmlFor={props.name || props.id} className={style.label}>
      <input onKeyUp={handleKeyUp} onChange={onChange} {...props} />
    </label>
  );
};

export default Input;
