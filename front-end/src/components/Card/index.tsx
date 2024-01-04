import { Card as TypeCard } from '@/types';
import { NavLink } from 'react-router-dom';
import Footage from '@/assets/footage/footage.svg';
import FootageOff from '@/assets/footage/footageOff.svg';
import Bedroom from '@/assets/bedroom/bedroom.svg';
import BedroomOff from '@/assets/bedroom/bedroomOff.svg';
import Garage from '@/assets/garage/garage.svg';
import GarageOff from '@/assets/garage/garageOff.svg';
import Bathroom from '@/assets/bathroom/bathroom.svg';
import BathroomOff from '@/assets/bathroom/bathroomOff.svg';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Environment } from '@/env';
import './card.scss';
import style from './card.module.scss';
import classNames from 'classnames';
import { transformationFloatString } from '@/functions/transformation';
import imageEmpty from '@/img/card/imgEmpty.jpg';

interface CardProps extends TypeCard {
  to: string;
  action?: boolean;
}

const Card: React.FC<CardProps> = ({
  about,
  footage,
  bedroom,
  garage,
  bathroom,
  area,
  city,
  state,
  rental,
  sell,
  photographs,
  business,
  to,
  action = false,
}: CardProps) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    draggable: true,
    touchMove: true,
  };

  const handleClick = (e: any) => {
    if (action) e.preventDefault();
  };

  return (
    <NavLink
      onClick={handleClick}
      className={classNames({
        [style.card]: action === false,
        [style['card-action']]: action === true,
      })}
      to={to}
    >
      <div className={style.images}>
        <Slider {...settings}>
          {photographs.length > 0 ? (
            photographs.map(({ id, describe, url }) => (
              <img key={id} src={`${Environment.URL_BASE}/uploads/${url}`} alt={describe} />
            ))
          ) : (
            <img src={imageEmpty} alt='imóvel ainda sem imagem' />
          )}
        </Slider>
        <div className={style.gvlar} />
      </div>
      <div>
        <div className={style.type}>
          <h2>{about}</h2>
          <div>
            <span
              className={classNames({
                [style.off]: true,
                [style.on]: business === 'ambos' || business === 'venda',
              })}
            >
              Venda
            </span>
            <span
              className={classNames({
                [style.off]: true,
                [style.on]: business === 'ambos' || business === 'aluguel',
              })}
            >
              Locação
            </span>
          </div>
        </div>
        <div className={style.box}>
          <div className={classNames({ [style.info]: true, [style.off]: footage === 0 })}>
            {footage === 0 ? <FootageOff /> : <Footage />}
            {footage === 0 ? '-' : `${footage} m²`}
          </div>
          <div className={classNames({ [style.info]: true, [style.off]: garage === 0 })}>
            {garage === 0 ? <GarageOff /> : <Garage />}
            {garage === 0 ? '-' : `${garage} Garagens`}
          </div>
        </div>
        <div className={style.box}>
          <div className={classNames({ [style.info]: true, [style.off]: bedroom === 0 })}>
            {bedroom === 0 ? <BedroomOff /> : <Bedroom />}
            {bedroom === 0 ? '-' : `${bedroom} Quartos`}
          </div>
          <div className={classNames({ [style.info]: true, [style.off]: bathroom === 0 })}>
            {bathroom === 0 ? <BathroomOff /> : <Bathroom />}
            {bathroom === 0 ? '-' : `${bathroom} Banheiros`}
          </div>
        </div>
        <p className={style.address}>
          {area} - {city} / {state}{' '}
        </p>
        <div className={style.values}>
          <div className={style.value}>
            <h5>Valor de venda</h5>
            <p>
              R${' '}
              {!(sell === null) && sell > 0
                ? transformationFloatString(sell)
                : sell === 0
                ? 'A combinar'
                : '-'}
            </p>
          </div>
          <div className={style.value}>
            <h5>Valor de aluguel</h5>
            <p>
              R${' '}
              {!(rental === null) && rental > 0
                ? transformationFloatString(rental)
                : rental === 0
                ? 'A combinar'
                : '-'}
            </p>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default Card;
