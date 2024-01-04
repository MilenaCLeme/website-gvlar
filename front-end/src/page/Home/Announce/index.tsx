import style from './announce.module.scss';
import Security from '@/assets/onlyOne/security.svg';
import Agreement from '@/assets/onlyOne/agreement.svg';
import MegaPhone from '@/assets/megaphone/megaphoneDivulgation.svg';
import AnnounceImage from '@/img/home/family.png';
import ButtonPhone from '../components/ButtonPhone';

const Announce = () => {
  return (
    <section className={style.main}>
      <h1 className={style.title}>APROVEITE A OPORTUNIDADE E ANUNCIE SEU IMÓVEL COM A GVLAR</h1>
      <div className={style['box-all']}>
        <div className={style.content}>
          <div className={style.box}>
            <Security />
            <div>
              <h2>Segurança</h2>
              <p>
                Transparência e confirmação das informações em todo o processo de compra e venda do
                seu imóvel.
              </p>
            </div>
          </div>
          <div className={style.box}>
            <MegaPhone />
            <div>
              <h2>Divulgação</h2>
              <p>
                O seu imóvel com destaque em nosso site e em nossas redes sociais, sem nenhuma taxa
                adicional.
              </p>
            </div>
          </div>
          <div className={style.box}>
            <Agreement />
            <div>
              <h2>Tranquilidade</h2>
              <p>
                Conte com nossa equipe de profissionais capacitados para garantir uma experiência
                imobiliária completa.
              </p>
            </div>
          </div>
        </div>
        <div className={style['box-announce']}>
          <div className={style.announce}>
            <img src={AnnounceImage} alt='uma família sentada no chão com um vaso de plantas' />
            <ButtonPhone />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Announce;
