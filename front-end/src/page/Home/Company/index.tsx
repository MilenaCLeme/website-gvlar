import GVlar from '@/assets/gvlar/logoWhite.svg';
import style from './company.module.scss';
import AnimatedText from './AnimatedText';
import CardClient from './CartClient';
import Nelson from '@/img/home/personNelson.jpeg';
import Nair from '@/img/home/personNair.jpeg';
import Marisa from '@/img/home/personMarisa.jpeg';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Company = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    draggable: true,
    touchMove: true,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 820,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

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
      <div className={style.glider}>
        <Slider {...settings}>
          <CardClient
            image={Marisa}
            instagram='@marisachessa'
            clientRef='https://www.instagram.com/marisachessa/?igshid=OGQ5ZDc2ODk2ZA%3D%3D'
            text='Excelente atendimento da equipe da Gvlar Imóveis durante a visita ao imóvel para locação. Profissionalismo e atenção aos detalhes impressionantes, tornando a experiência muito agradável. Recomendo a todos em busca de qualidade e eficiência'
          />

          <CardClient
            image={Nelson}
            instagram='@nelsonchrysostomo'
            clientRef='https://www.instagram.com/nelsonchrysostomo/?igshid=NzBvcjFlYjFjcWEx'
            text='Anos de contrato estagnado, até encontrar a equipe incrível desta imobiliária. Com compreensão e expertise, eles transformaram um impasse em solução. Minha eterna gratidão por fazerem dos obstáculos da locação um caminho tranquilo e seguro.'
          />

          <CardClient
            image={Nair}
            instagram='@nair.moura'
            clientRef='https://www.instagram.com/nair.moura/?igshid=OGQ5ZDc2ODk2ZA%3D%3D'
            text='Excelente atendimento da equipe da Gvlar Imóveis durante a visita ao imóvel para locação. Profissionalismo e atenção aos detalhes impressionantes, tornando a experiência muito agradável. Recomendo a todos em busca de qualidade e eficiência'
          />
        </Slider>
      </div>
    </section>
  );
};

export default Company;
