import { pageId, pageWithFilter } from '@/service/api/property';
import { Card as TypeCard } from '@/types';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Environment } from '@/env';
import imageEmpty from '@/img/card/imgEmpty.jpg';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import style from './propertyId.module.scss';
import Footage from '@/assets/footage/footage.svg';
import FootageOff from '@/assets/footage/footageOff.svg';
import Bedroom from '@/assets/bedroom/bedroom.svg';
import BedroomOff from '@/assets/bedroom/bedroomOff.svg';
import Garage from '@/assets/garage/garage.svg';
import GarageOff from '@/assets/garage/garageOff.svg';
import Bathroom from '@/assets/bathroom/bathroom.svg';
import BathroomOff from '@/assets/bathroom/bathroomOff.svg';
import { transformationFloatString } from '@/functions/transformation';
import classNames from 'classnames';
import './propertyId.scss';
import Glider from 'react-glider';
import 'glider-js/glider.min.css';
import Card from '@/components/Card';
import ShareButton from './ShareButton';
import SchedulingButton from './SchedulingButton';
import ModalImage from './ModalImage';
import { scrollToTop } from '@/functions/scroll';

const PropertyId = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  const [data, setData] = useState<TypeCard>({} as TypeCard);
  const [loading, setLoading] = useState<boolean>(true);
  const [dataFilter, setDataFilter] = useState<TypeCard[]>([]);
  const [loadingFilter, setLoadingFilter] = useState<boolean>(true);

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    async function fetchApi() {
      try {
        const number = Number(id);
        if (typeof number === 'number') {
          const data = await pageId(number);

          if (data && 'message' in data) {
            navigate('/');
          }

          if (data && 'id' in data) {
            setData(data);
          }
        }
      } catch (error: any) {
        navigate('/');
      } finally {
        setLoading(false);
      }
    }

    fetchApi();
  }, [id, navigate]);

  useEffect(() => {
    async function fetchApi() {
      try {
        if (data && 'id' in data) {
          const dataFilter = await pageWithFilter(1, { about: data.about });

          if (dataFilter && 'items' in dataFilter) {
            setDataFilter(dataFilter.items.slice(0, 5));
          }
        }
      } catch (error: any) {
        console.log(error);
      } finally {
        setLoadingFilter(false);
      }
    }

    fetchApi();
  }, [data]);

  const cardStyle = {
    height: '500px',
  };

  return (
    <>
      {!loading && (
        <div className={style.main}>
          {'id' in data && (
            <>
              <div className={style.glider}>
                <Slider {...settings}>
                  {data.photographs.length > 0 ? (
                    data.photographs.map(({ id, describe, url }) => (
                      <ModalImage
                        key={id}
                        img={`${Environment.URL_BASE}/uploads/${url}`}
                        alt={describe}
                      />
                    ))
                  ) : (
                    <ModalImage img={imageEmpty} alt='imóvel ainda sem imagem' />
                  )}
                </Slider>
              </div>
              <div className={style.buttons}>
                <ShareButton
                  title={`Olha esse incrivel ${data.about} que encontrei na gvlar:`}
                  url={`${Environment.URL_DOMINIO}/encontrar/imovel/${data.id}`}
                />
                <SchedulingButton {...data} />
              </div>
              <section className={style['section-mobile']}>
                <div className={style.flex}>
                  <div>
                    <div>
                      <h2 className={style['titule-mobile']}>Tipo de imóvel</h2>
                      <p className={style.paragraph}>{data.about}</p>
                    </div>
                    <div className={style.margin}>
                      <h2 className={style['titule-mobile']}>Aceita</h2>
                      <div className={style['flex-space-between']}>
                        <p
                          className={classNames({
                            [style['cor-active']]: true,
                            [style['cor-off']]: data.business === 'aluguel',
                          })}
                        >
                          Venda
                        </p>
                        <p
                          className={classNames({
                            [style['cor-active']]: true,
                            [style['cor-off']]: data.business === 'venda',
                          })}
                        >
                          Locação
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h2 className={style['titule-mobile']}>Sobre o Imóvel</h2>
                    <div>
                      <div className={style['flex-about']}>
                        <div className={style['flex-about-property']}>
                          {data.bedroom === 0 ? <BedroomOff /> : <Bedroom />}
                          <p className={style['paragraph']}>
                            {data.bedroom === 0 ? '- Quartos' : `${data.bedroom} Quartos`}
                          </p>
                        </div>
                        <div className={style['flex-about-property']}>
                          {data.bathroom === 0 ? <BathroomOff /> : <Bathroom />}
                          <p className={style['paragraph']}>
                            {data.bathroom === 0 ? '- Banheiros' : `${data.bathroom} Banheiros`}
                          </p>
                        </div>
                      </div>
                      <div className={style['flex-about']}>
                        <div className={style['flex-about-property']}>
                          {data.footage === 0 ? <FootageOff /> : <Footage />}
                          <p className={style['paragraph']}>
                            {data.footage === 0 ? '- M²' : `${data.footage} M²`}
                          </p>
                        </div>
                        <div className={style['flex-about-property']}>
                          {data.garage === 0 ? <GarageOff /> : <Garage />}
                          <p className={style['paragraph']}>
                            {data.garage === 0 ? '- Garagens' : `${data.garage} Garagens`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={style.margin}>
                  <h2 className={style['titule-mobile']}>Valores</h2>
                  <div>
                    <h3 className={style['sub-titulo']}>IPTU</h3>
                    <p className={style.paragraph}>{`R$ ${transformationFloatString(
                      data.iptu,
                    )}`}</p>
                  </div>
                  <div className={style['flex-value']}>
                    <div>
                      <h3 className={style['sub-titulo']}>Valor de venda</h3>
                      <p className={style.paragraph}>
                        {!(data.sell === null) && data.sell > 0
                          ? `R$ ${transformationFloatString(data.sell)}`
                          : data.sell === 0
                          ? 'A combinar'
                          : '-'}
                      </p>
                    </div>
                    <div>
                      <h3 className={style['sub-titulo']}>Valor de aluguel</h3>
                      <p className={style.paragraph}>
                        {!(data.rental === null) && data.rental > 0
                          ? `R$ ${transformationFloatString(data.rental)}`
                          : data.rental === 0
                          ? 'A combinar'
                          : '-'}
                      </p>
                    </div>
                  </div>
                </div>
                <div className={style.margin}>
                  <h2 className={style['titule-mobile']}>Localização</h2>
                  <p className={style.paragraph}>
                    {data.zone === null || data.zone === undefined || data.zone === '' ? (
                      <>
                        {data.area} - {data.city} / {data.state}{' '}
                      </>
                    ) : (
                      <>
                        {data.zone} - {data.area} - {data.city} / {data.state}{' '}
                      </>
                    )}
                  </p>
                </div>
                <div className={style.margin}>
                  <h2 className={style['titule-mobile']}>Descritivo</h2>
                  <p className={style.paragraph}>{data.description}</p>
                </div>
              </section>
              <section className={style['section-desk']}>
                <div className={style['main-desk']}>
                  <div className={style.width}>
                    <div className={style.margin}>
                      <h2 className={style['titule-mobile']}>Tipo de imóvel</h2>
                      <p className={style.paragraph}>{data.about}</p>
                    </div>
                    <div className={style.margin}>
                      <h2 className={style['titule-mobile']}>Aceita</h2>
                      <div className={style['flex-space-between']}>
                        <p
                          className={classNames({
                            [style['cor-active']]: true,
                            [style['cor-off']]: data.business === 'aluguel',
                          })}
                        >
                          Venda
                        </p>
                        <p
                          className={classNames({
                            [style['cor-active']]: true,
                            [style['cor-off']]: data.business === 'venda',
                          })}
                        >
                          Locação
                        </p>
                      </div>
                    </div>
                    <div className={style.margin}>
                      <h2 className={style['titule-mobile']}>Valores</h2>
                      <div>
                        <h3 className={style['sub-titulo']}>IPTU</h3>
                        <p className={style.paragraph}>{`R$ ${transformationFloatString(
                          data.iptu,
                        )}`}</p>
                      </div>
                      <div className={style['flex-value']}>
                        <div>
                          <h3 className={style['sub-titulo']}>Valor de venda</h3>
                          <p className={style.paragraph}>
                            {!(data.sell === null) && data.sell > 0
                              ? `R$ ${transformationFloatString(data.sell)}`
                              : data.sell === 0
                              ? 'A combinar'
                              : '-'}
                          </p>
                        </div>
                        <div>
                          <h3 className={style['sub-titulo']}>Valor de aluguel</h3>
                          <p className={style.paragraph}>
                            {!(data.rental === null) && data.rental > 0
                              ? `R$ ${transformationFloatString(data.rental)}`
                              : data.rental === 0
                              ? 'A combinar'
                              : '-'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={style.width}>
                    <div className={style.margin}>
                      <h2 className={style['titule-mobile']}>Descritivo</h2>
                      <h2
                        className={classNames({
                          [style['titule-mobile']]: true,
                          [style['margin']]: true,
                        })}
                      >
                        Localização
                      </h2>
                      <p className={style.paragraph}>
                        {data.zone === null || data.zone === undefined || data.zone === '' ? (
                          <>
                            {data.area} - {data.city} / {data.state}{' '}
                          </>
                        ) : (
                          <>
                            {data.zone} - {data.area} - {data.city} / {data.state}{' '}
                          </>
                        )}
                      </p>
                    </div>
                    <div className={style.margin}>
                      <h2 className={style['titule-mobile']}>Sobre o Imóvel</h2>
                      <div className={style['flex-desk']}>
                        <div className={style['flex-about-property']}>
                          {data.bedroom === 0 ? <BedroomOff /> : <Bedroom />}
                          <p className={style['paragraph']}>
                            {data.bedroom === 0 ? '- Quartos' : `${data.bedroom} Quartos`}
                          </p>
                        </div>
                        <div className={style['flex-about-property']}>
                          {data.bathroom === 0 ? <BathroomOff /> : <Bathroom />}
                          <p className={style['paragraph']}>
                            {data.bathroom === 0 ? '- Banheiros' : `${data.bathroom} Banheiros`}
                          </p>
                        </div>
                        <div className={style['flex-about-property']}>
                          {data.footage === 0 ? <FootageOff /> : <Footage />}
                          <p className={style['paragraph']}>
                            {data.footage === 0 ? '- M²' : `${data.footage} M²`}
                          </p>
                        </div>
                        <div className={style['flex-about-property']}>
                          {data.garage === 0 ? <GarageOff /> : <Garage />}
                          <p className={style['paragraph']}>
                            {data.garage === 0 ? '- Garagens' : `${data.garage} Garagens`}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className={style.margin}>
                      <p className={style.paragraph}>{data.description}</p>
                    </div>
                  </div>
                </div>
              </section>
              {!loadingFilter && (
                <div className={style.glider}>
                  <Glider
                    slidesToShow={'auto'}
                    slidesToScroll={1}
                    itemWidth={290}
                    exactWidth
                    draggable
                    dots={false}
                    hasArrows
                    scrollLock={false}
                  >
                    {dataFilter.map((property) => (
                      <div style={cardStyle} key={property.id}>
                        <Card {...property} to={`encontrar/imovel/${property.id}`} />
                      </div>
                    ))}
                  </Glider>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default PropertyId;
