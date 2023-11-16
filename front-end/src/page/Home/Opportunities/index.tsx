import ButtonPhone from '../components/ButtonPhone';
import style from './opportunities.module.scss';

const Opportunities = () => {
  return (
    <section className={style.main}>
      <h1 className={style.title}>Aproveite as nossos imóveis</h1>
      <h2 className={style.subtitle}>O seu imóvel pode também estar aqui!</h2>
      <ButtonPhone />
    </section>
  );
};

export default Opportunities;
