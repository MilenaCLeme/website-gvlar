import style from './button.module.scss';
import { Button as ButtonProps } from '@/types';

const Button: React.FC<ButtonProps> = ({ name, onClick, className, disabled }: ButtonProps) => {
  return (
    <button
      type='button'
      disabled={disabled}
      onClick={onClick}
      className={className ? className : style.button}
    >
      {name}
    </button>
  );
};

export default Button;
