import AnimatedText from './AnimatedText';
import CardClient from './CardClient';
import style from './aboutcompany.module.scss';
import GVLar from '@/assets/home/logoGVLarBlack.svg';

const AboutCompany = () => {
  return (
    <section className={style.container}>
      <div className={style.container__company}>
        <div className={style.container__company__logo}>
          <GVLar />
        </div>
        <div className={style.container__company__all}>
          <p className={style.container__company__about}>
            A GVLAR IMÓVEIS presta serviços no ramo imobiliário, intermediando negociações de
            compra, venda e locação. Conta também com um setor de administração de imóveis e com
            departamento jurídico que acompanha todas as negociações efetuadas em nossa imobiliária
            para realizar tudo com a máxima segurança aos nossos clientes.
          </p>
          <AnimatedText />
        </div>
      </div>
      <div className={style.container__client}>
        <h2>A nossa história é contada por nossos clientes</h2>
        <div className={style.container__client__box}>
          <CardClient />
          <CardClient />
          <CardClient />
        </div>
      </div>
    </section>
  );
};

export default AboutCompany;
