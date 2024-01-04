import { InputHTMLAttributes, ReactNode } from 'react';
import CheckedFalse from '@/assets/checkbox/checkedFalse.svg';
import CheckedTrue from '@/assets/checkbox/checkedTrue.svg';
import style from './inputCheck.module.scss';

interface InputCheckProps extends InputHTMLAttributes<HTMLInputElement> {
  checked: boolean;
  label: string | ReactNode;
  className?: string;
}

const InputCheck: React.FC<InputCheckProps> = ({
  checked,
  label,
  className,
  ...props
}: InputCheckProps) => {
  return (
    <label htmlFor={props.name || props.id} className={className}>
      <input className={style.input} {...props} />
      <span className={style.svg}>{checked ? <CheckedTrue /> : <CheckedFalse />}</span>
      {label}
    </label>
  );
};

export default InputCheck;
