import family from '@/img/home/family.png';
import Security from '@/assets/home/security.svg';
import Announce from '@/assets/home/announce.svg';
import Agreement from '@/assets/home/agreement.svg';
import style from './announceProperty.module.scss';

const AnnounceProperty = () => {
  return (
    <section className={style.container}>
      <h1 className={style.title_announce}>
        Aproveite a oportunidade e anuncie seu imóvel com a GVLAR
      </h1>
      <div className={style.container_announce}>
        <div className={style.container_photo}>
          <img src={family} alt='uma família sentada no chão com um vaso de plantas.' />
          <button>anunciar</button>
        </div>
        <div className={style.container_group}>
          <div className={style.container_text}>
            <Security />
            <div className={style.container_text__info}>
              <h3>Segurança</h3>
              <p>
                Transparência e confirmação das informações em todo o processo de compra e venda do
                seu imóvel.
              </p>
            </div>
          </div>
          <div className={style.container_text}>
            <Announce />
            <div className={style.container_text__info}>
              <h3>Divulgação</h3>
              <p>
                Transparência e confirmação das informações em todo o processo de compra e venda do
                seu imóvel.
              </p>
            </div>
          </div>
          <div className={style.container_text}>
            <Agreement />
            <div className={style.container_text__info}>
              <h3>Tranquilidade</h3>
              <p>
                Conte com nossa equipe de profissionais capacitados para garantir uma experiência
                imobiliária completa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnnounceProperty;
