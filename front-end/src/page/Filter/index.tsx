import { useEffect, useState } from 'react';
import style from './filter.module.scss';

import Form from './Form';
import { PageFilter, Property } from '@/types';
import { pageWithFilter } from '@/service/property';
import Card from '@/components/Card';

const Filter = () => {
  /*
  const [rental, setRental] = useState<boolean>(false);
  const [sell, setSell] = useState<boolean>(false);
  const [bedroom, setBedroom] = useState<string>('0');
  const [bathroom, setBathroom] = useState<string>('0');
  const [garage, setGarage] = useState<string>('0');
  */

  const [properties, setProperties] = useState<Property[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    async function callApi() {
      const data: PageFilter = await pageWithFilter(page, {});
      setProperties(data.items);
    }
    callApi();
  }, [page]);

  console.log(properties);

  return (
    <>
      <div className={style.container}>
        <h1 className={style.title_page}>Encontre aqui o imóvel do seus sonhos</h1>
        <Form />
        <section className={style.container_cards}>
          {properties.map((property, index) => (
            <Card key={index} property={property} />
          ))}
        </section>
      </div>
    </>
  );
};

export default Filter;
