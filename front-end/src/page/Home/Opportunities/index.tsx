import { Property } from '@/types';
import style from './opportunities.module.scss';
import Card from '@/components/Card';
import { NavLink } from 'react-router-dom';

interface OpportunitiesProps {
  properties: Property[];
}
const Opportunities: React.FC<OpportunitiesProps> = ({ properties }: OpportunitiesProps) => {
  return (
    <section className={style.container}>
      <h1 className={style.container__title}>Aproveite as nossas oportunidades</h1>
      <div className={style.container__cards}>
        {properties.map((properties, index) => (
          <Card key={index} property={properties} />
        ))}
      </div>
      <h2 className={style.container__subtitle}>O seu imóvel pode também estar aqui!</h2>
      <NavLink className={style.container__button} to='/'>
        Anunciar
      </NavLink>
    </section>
  );
};

export default Opportunities;
