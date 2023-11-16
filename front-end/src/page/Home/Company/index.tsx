import GVlar from '@/assets/gvlar/logoWhite.svg';
import style from './company.module.scss';
import AnimatedText from './AnimatedText';
import CardClient from './CartClient';
import Nelson from '@/img/WhatsApp Image 2023-11-14 at 11.47.15.jpeg';

const Company = () => {
  return (
    <section className={style.main}>
      <div className={style.box}>
        <GVlar />
        <div className={style.texts}>
          <p className={style.text}>
            A GVLAR IMÓVEIS presta serviços no ramo imobiliário, intermediando negociações de
            compra, venda e locação. Conta também com um setor de administração de imóveis e com
            departamento jurídico que acompanha todas as negociações efetuadas em nossa imobiliária
            para realizar tudo com a máxima segurança aos nossos clientes.
          </p>
          <AnimatedText />
        </div>
      </div>
      <h2 className={style.title}>A nossa história é contada por nossos clientes</h2>
      <CardClient
        image={Nelson}
        instagram='@nelsonchrysostomo'
        clientRef='https://www.instagram.com/nelsonchrysostomo/?igshid=NzBvcjFlYjFjcWEx'
        text='Anos de contrato estagnado, até encontrar a equipe incrível desta imobiliária. Com compreensão e expertise, eles transformaram um impasse em solução. Minha eterna gratidão por fazerem dos obstáculos da locação um caminho tranquilo e seguro.'
      />
    </section>
  );
};

export default Company;
