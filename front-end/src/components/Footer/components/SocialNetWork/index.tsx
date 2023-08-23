import style from './socialNetWork.module.scss';

const SocialNetWork = () => {
  return (
    <>
      <h3 className={style.title}>Nos acompanhe nas redes sociais</h3>
      <div className={style.net}>
        <a
          className={style.facebook}
          target='_blank'
          rel='noopener noreferrer'
          href='https://www.facebook.com/GvlarImoveis/'
        >
          <div />
        </a>
        <a
          className={style.instagram}
          target='_blank'
          rel='noopener noreferrer'
          href='https://www.instagram.com/gvlarimoveis/'
        >
          <div />
        </a>
        <a
          className={style.youtube}
          target='_blank'
          rel='noopener noreferrer'
          href='mailto:gvlar@gvlar.com.br'
        >
          <div />
        </a>
        <a
          className={style.tiktok}
          target='_blank'
          rel='noopener noreferrer'
          href='mailto:gvlar@gvlar.com.br'
        >
          <div />
        </a>
      </div>
    </>
  );
};

export default SocialNetWork;
