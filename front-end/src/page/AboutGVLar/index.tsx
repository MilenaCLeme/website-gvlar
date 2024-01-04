import classNames from 'classnames';
import videoMobile from '@/video/gvlarMobile.mp4';
import videoDesk from '@/video/gvlarDesk.mp4';
import style from './aboutGVLar.module.scss';
import FormAbout from './FormAbout';
import Whatsapp from '@/components/Footer/components/Whatsapp';
import EmailGVLAR from '@/components/Footer/components/EmailGVLAR';
import { useEffect } from 'react';
import { scrollToTop } from '@/functions/scroll';

const AboutGVLar = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <section className={style.banner}>
      <video
        className={classNames({ [style['video']]: true, [style.one]: true })}
        autoPlay
        muted
        loop
      >
        <source src={videoMobile} type='video/mp4' />
        Seu navegador não suporta a reprodução de vídeos.
      </video>
      <video
        className={classNames({ [style['video']]: true, [style.two]: true })}
        autoPlay
        muted
        loop
      >
        <source src={videoDesk} type='video/mp4' />
        Seu navegador não suporta a reprodução de vídeos.
      </video>
      <div className={style.content}>
        <div className={style['main-mobile']}>
          <h1 className={style['title-mobile']}>CONTATOS</h1>
          <div className={style['box-title-mobile']} />
          <p className={style['box-sub-title-mobile']}>
            Conte com nossa equipe de profissionais capacitados para garantir uma experiência
            imobiliária completa.
          </p>
          <FormAbout />
          <div className={style['box-contact']}>
            <Whatsapp />
            <EmailGVLAR />
            <a
              className={style.address}
              target='_blank'
              rel='noopener noreferrer'
              href='https://goo.gl/maps/3BypkpUKTgFVkU4YA'
            >
              <div />
              <span>R. Cuiabá, 797 - Alto da Mooca - São Paulo/SP</span>
            </a>
          </div>
          <div>
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
          </div>
        </div>
        <div className={style['main-desk']}>
          <div>
            <h1 className={style['title-mobile']}>CONTATOS</h1>
            <div className={style['box-title-mobile']} />
            <p className={style['box-sub-title-mobile']}>
              Conte com nossa equipe de profissionais capacitados para garantir uma experiência
              imobiliária completa.
            </p>
            <div className={style['box-contact']}>
              <Whatsapp />
              <EmailGVLAR />
              <a
                className={style.address}
                target='_blank'
                rel='noopener noreferrer'
                href='https://goo.gl/maps/3BypkpUKTgFVkU4YA'
              >
                <div />
                <span>R. Cuiabá, 797 - Alto da Mooca - São Paulo/SP</span>
              </a>
            </div>
            <div>
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
            </div>
          </div>
          <FormAbout />
        </div>
      </div>
    </section>
  );
};

export default AboutGVLar;
