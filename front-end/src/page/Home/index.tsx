import { useEffect, useState } from 'react';
import AboutCompany from './AboutCompany';
import AnnounceProperty from './AnnounceProperty';
import FormFilter from './FormFilter';
import Opportunities from './Opportunities';
import ParallaxCarousel from './ParallaxCarousel';
import style from './home.module.scss';
import GVLar from '@/assets/home/logoGVLarWhite.svg';
import { Property } from '@/types';
import { getRandomProperties } from '@/service/property';

const Home = () => {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    async function callApi() {
      const data: Property[] = await getRandomProperties();
      setProperties(data);
    }
    callApi();
  }, []);

  return (
    <>
      <div className={style.container}>
        <div className={style.container__logo}>
          <GVLar />
          <h1>Aqui seus sonhos ganham um novo lar</h1>
          <p>Seja para investir, morar ou trabalhar. Aqui você encontra!</p>
        </div>
        <div className={style.container__filter}>
          <FormFilter />
        </div>
      </div>
      <ParallaxCarousel />
      <AnnounceProperty />
      <AboutCompany />
      {properties.length > 0 && <Opportunities properties={properties} />}
    </>
  );
};

export default Home;
