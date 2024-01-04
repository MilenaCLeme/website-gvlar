import { Card as TypeCard } from '@/types';
import ButtonPhone from '../components/ButtonPhone';
import style from './opportunities.module.scss';
import Card from '@/components/Card';
import Glider from 'react-glider';
import 'glider-js/glider.min.css';

interface OpportunitiesProps {
  properties: TypeCard[];
}

const Opportunities: React.FC<OpportunitiesProps> = ({ properties }: OpportunitiesProps) => {
  const cardStyle = {
    height: '500px',
  };
  return (
    <section className={style.main}>
      <h1 className={style.title}>Aproveite e veja os nossos imóveis</h1>
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
          {properties.map((property) => (
            <div style={cardStyle} key={property.id}>
              <Card {...property} to={`encontrar/imovel/${property.id}`} />
            </div>
          ))}
        </Glider>
      </div>
      <h2 className={style.subtitle}>O seu imóvel pode também estar aqui!</h2>
      <ButtonPhone />
    </section>
  );
};

export default Opportunities;
