import style from './buttonIcon.module.scss';
import { Button as ButtonProps } from '@/types';

const ButtonIcon: React.FC<ButtonProps> = ({ name, onClick, className, disabled }: ButtonProps) => {
  return (
    <button
      type='button'
      disabled={disabled}
      onClick={onClick}
      className={className ? className : style.button}
    >
      {name}
      <div />
    </button>
  );
};

export default ButtonIcon;
