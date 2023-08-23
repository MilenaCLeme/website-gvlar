import style from './buttonArrow.module.scss';

const ButtonArrow = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button className={style.button} type='button' onClick={() => scrollToTop()}>
      <div />
    </button>
  );
};

export default ButtonArrow;
