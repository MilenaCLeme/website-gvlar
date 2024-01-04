import { NavLink } from 'react-router-dom';
import FooterMobile from './FooterMobile';
import Logo from '@/assets/gvlar/logoWhite.svg';
import style from './footer.module.scss';
import Effect from '@/img/effect/big.png';
import ButtonArrow from './components/ButtonArrow';
import Address from './components/Address';
import Creci from './components/Creci';
import Clock from './components/Clock';
import Whatsapp from './components/Whatsapp';
import EmailGVLAR from './components/EmailGVLAR';
import Contact from './components/Contact';
import SocialNetWork from './components/SocialNetWork';
import NavFooter from './components/NavFooter';
import { Environment } from '@/env';

const Footer = () => {
  return (
    <>
      <FooterMobile />
      <footer className={style.footer}>
        <img src={Effect} className={style.effect} alt='img' />
        <div className={style.information}>
          <div className={style.main}>
            <Logo />
            <div className={style.box}>
              <div className={style.box__one}>
                <div className={style.box__flex}>
                  <Address />
                  <Creci />
                  <Clock />
                </div>
                <div className={style.box__flex}>
                  <Whatsapp />
                  <EmailGVLAR />
                  <Contact />
                </div>
                <div className={style.box__flex}>
                  <div>
                    <SocialNetWork />
                  </div>
                  <a
                    className={style.act}
                    target='_blank'
                    rel='noopener noreferrer'
                    href={`${Environment.URL_DOMINIO}/termos`}
                  >
                    termos e condições de uso
                  </a>
                </div>
              </div>
              <div className={style.box__two} />
              <div className={style.box__three}>
                <NavFooter />
              </div>
            </div>
            <div className={style.div}>
              <ButtonArrow />
            </div>
          </div>
          <div className={style.website}>
            <p>Copyright 2023 © GVLAR Imóveis Creci: 37.691-J | Todos os Direitos Reservados</p>
            <div className={style.mn}>
              <p>Pensado, Criado e Desenvolvido por</p>
              <a
                className={style.mn__link}
                target='_black'
                rel='noopener'
                href='https://www.instagram.com/mn.techmkt/'
              >
                <div />
                <p>
                  <span className={style.mn__link__colorOne}>Tecnologia</span>e
                  <span className={style.mn__link__colorTwo}>Comunicação</span>
                </p>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
