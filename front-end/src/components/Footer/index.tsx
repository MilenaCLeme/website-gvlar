import { NavLink } from 'react-router-dom';
import style from './footer.module.scss';
import LogoGVLar from '@/assets/footer/logogvlarwhite.svg';
import Door from '@/assets/footer/door.svg';
import Clock from '@/assets/footer/clock.svg';

const Footer = () => {
  return (
    <footer>
      <div className={style.footer}>
        <div className={style.footer__logo}>
          <LogoGVLar />
        </div>
        <div className={style.container_one}>
          <a
            className={style.container_one__link_address}
            target='_blank'
            rel='noopener noreferrer'
            href='https://goo.gl/maps/3BypkpUKTgFVkU4YA'
          >
            <div className={style.container_one__link_address__svg} />
            <div className={style.container_one__link_address__title}>
              R. Cuiabá, 797 - Alto da Mooca, São Paulo - SP, 03183-001
            </div>
          </a>
          <div className={style.container_one__creci}>
            <Door />
            Creci: 37.691-J
          </div>
          <div className={style.container_one__clock}>
            <Clock />
            <div className={style.container_one__clock__text}>
              <h6>Horário de funcionamento</h6>
              <p>Horário de Segunda a Sexta 09:00hrs as 18:00hrs</p>
            </div>
          </div>
        </div>
        <div className={style.container_two}>
          <a
            className={style.container_two__phone}
            target='_blank'
            rel='noopener noreferrer'
            href='https://api.whatsapp.com/send/?phone=5511940020947&text&type=phone_number&app_absent=0'
          >
            <div className={style.container_two__phone__svg} />
            <div className={style.container_two__phone__about}>
              <p className={style.container_two__phone__about__number}>(11) 94002-0947</p>
              <p className={style.container_two__phone__about__name}>Vania Leme</p>
            </div>
          </a>
          <a
            className={style.container_two__mail}
            target='_blank'
            rel='noopener noreferrer'
            href='mailto:gvlar@gvlar.com.br'
          >
            <div className={style.container_two__mail__svg} />
            gvlar@gvlar.com.br
          </a>
          <NavLink className={style.container_two__contact} to='/'>
            <div className={style.container_two__contact__svg} />
            Outros contatos
          </NavLink>
        </div>
        <div className={style.container_three}>
          <h6 className={style.container_three__network}>Siga-nos nas redes sociais</h6>
          <a
            className={style.container_three__facebook}
            target='_blank'
            rel='noopener noreferrer'
            href='https://www.facebook.com/GvlarImoveis/'
          >
            <div className={style.container_three__facebook__svg} />
          </a>
          <a
            className={style.container_three__instagram}
            target='_blank'
            rel='noopener noreferrer'
            href='https://www.instagram.com/gvlarimoveis/'
          >
            <div className={style.container_three__instagram__svg} />
          </a>
          <a
            className={style.container_three__youtube}
            target='_blank'
            rel='noopener noreferrer'
            href='mailto:gvlar@gvlar.com.br'
          >
            <div className={style.container_three__youtube__svg} />
          </a>
          <a
            className={style.container_three__tiktok}
            target='_blank'
            rel='noopener noreferrer'
            href='mailto:gvlar@gvlar.com.br'
          >
            <div className={style.container_three__tiktok__svg} />
          </a>
        </div>
      </div>
      <div className={style.info_developers}>
        <p>
          Copyright 2023 © GVLAR Imóveis Creci: 37.691-J | Todos os Direitos Reservados –
          Desenvolvido por
        </p>
        <a
          className={style.info_developers__company}
          target='_black'
          rel='noopener'
          href='https://www.instagram.com/mn.techmkt/'
        >
          {' '}
          <div className={style.info_developers__company__img} />
        </a>
        <p>tecnologia e comunicação</p>
      </div>
    </footer>
  );
};

export default Footer;
