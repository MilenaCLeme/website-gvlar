import { NavLink } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Footage from '@/assets/iconsAll/footage.svg';
import CarGray from '@/assets/iconsAll/car/carGray.svg';
import Car from '@/assets/iconsAll/car/car.svg';
import Bed from '@/assets/iconsAll/bed/bed.svg';
import BedGray from '@/assets/iconsAll/bed/bedGray.svg';
import Bathtub from '@/assets/iconsAll/bathtub/bathtub.svg';
import BathtubGray from '@/assets/iconsAll/bathtub/bathtubGray.svg';
import { Property } from '@/types';
import config from '@/config/config';
import style from './card.module.scss';
import { capitalizeFirstLetter } from '@/functions';
import classNames from 'classnames';
import './card.scss';

interface CardProps {
  property: Property;
}

const Card: React.FC<CardProps> = ({ property }: CardProps) => {
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

  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });

  return (
    <NavLink className={style.container} to=''>
      <div className={style.container__img}>
        <Slider {...settings}>
          {property.photographs.map(({ id, describe, url }) => (
            <img
              className={style.container__img__photo}
              key={id}
              src={`${config.apiUrl}/uploads/${url}`}
              alt={describe}
            />
          ))}
        </Slider>
        <div className={style.container__img__card} />
      </div>
      <div>
        <div className={style.container__info}>
          <h4>{capitalizeFirstLetter(property.type)}</h4>
          <div className={style.container__info__box}>
            <span
              className={classNames({
                [style.container__info__box__text]: true,
                [style.container__info__box__color]:
                  property.about === 'venda' || property.about === 'ambos',
              })}
            >
              Venda
            </span>
            <span
              className={classNames({
                [style.container__info__box__text]: true,
                [style.container__info__box__color]:
                  property.about === 'aluguel' || property.about === 'ambos',
              })}
            >
              Locação
            </span>
          </div>
        </div>
        <div className={style.container__about}>
          <div className={style.container__about__box}>
            <div
              className={classNames({
                [style.container__about__box__icons]: true,
                [style.container__about__box__color]: property.footage === 0,
              })}
            >
              <Footage />
              <p>{property.footage === 0 ? '-' : `${property.footage} m²`}</p>
            </div>
            <div
              className={classNames({
                [style.container__about__box__icons]: true,
                [style.container__about__box__color]: property.bedroom === 0,
              })}
            >
              {property.bedroom === 0 ? <BedGray /> : <Bed />}
              <p>{property.bedroom === 0 ? '-' : `${property.bedroom} Quartos`}</p>
            </div>
          </div>
          <div className={style.container__about__box}>
            <div
              className={classNames({
                [style.container__about__box__icons]: true,
                [style.container__about__box__color]: property.garage === 0,
              })}
            >
              {property.garage === 0 ? <CarGray /> : <Car />}
              <p>{property.garage === 0 ? '-' : `${property.garage} Garagens`}</p>
            </div>
            <div
              className={classNames({
                [style.container__about__box__icons]: true,
                [style.container__about__box__color]: property.bathroom === 0,
              })}
            >
              {property.bathroom === 0 ? <BathtubGray /> : <Bathtub />}
              <p>{property.bathroom === 0 ? '-' : `${property.bathroom} Banheiros`}</p>
            </div>
          </div>
        </div>
        <p className={style.container__state}>
          {property.area} - {property.city} / {property.state}
        </p>
        <div className={style.container__value}>
          <div
            className={classNames({
              [style.container__value__box]: true,
              [style.container__value__box__color]: !property.sell,
            })}
          >
            <h5>Valor de venda</h5>
            <p>{property.sell ? `${formatter.format(Number(property.sell))}` : `R$ -`}</p>
          </div>
          <div
            className={classNames({
              [style.container__value__box]: true,
              [style.container__value__box__color]: !property.rental,
            })}
          >
            <h5>Valor de aluguel</h5>
            <p>{property.rental ? `${formatter.format(Number(property.rental))}` : `R$ -`}</p>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default Card;
