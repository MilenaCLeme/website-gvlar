import { Button } from '@/types';
import style from './buttonDelete.module.scss';

const ButtonDelete: React.FC<Button> = ({ name, onClick, disabled }: Button) => {
  return (
    <button className={style.button} type='button' onClick={onClick} disabled={disabled}>
      {name}
      <div />
    </button>
  );
};

export default ButtonDelete;
