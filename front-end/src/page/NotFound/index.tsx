import OpsError from '@/assets/onlyOne/404.svg';
import LogoGV from '@/assets/gvlar/logoBlack.svg';
import style from './notFound.module.scss';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

const NotFound = () => {
  const navigate = useNavigate();

  const goHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <section className={style.main}>
      <div className={style.box}>
        <div className={style['box-img-404']}>
          <h1>Pagina não encontrada</h1>
          <OpsError />
        </div>
        <div className={style['box-logo']}>
          <LogoGV />
        </div>
      </div>
      <h1 className={style.title}>Volte para a casa</h1>
      <button onClick={goHome} className={style.button}>
        Voltar para GVLAR
        <div className={style.house} />
      </button>
    </section>
  );
};

export default NotFound;
