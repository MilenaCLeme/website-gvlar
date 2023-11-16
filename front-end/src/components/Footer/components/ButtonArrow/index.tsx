import { scrollToTop } from '@/functions/scroll';
import style from './buttonArrow.module.scss';

const ButtonArrow = () => {
  return (
    <button className={style.button} type='button' onClick={() => scrollToTop()}>
      <div />
    </button>
  );
};

export default ButtonArrow;
