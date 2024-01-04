import { useAxios } from '@/service/hook/use-axios';
import Announce from './Announce';
import Banner from './Banner';
import Company from './Company';
import Opportunities from './Opportunities';
import api from '@/service/api/axios-config';
import { useEffect } from 'react';
import { scrollToTop } from '@/functions/scroll';

const Home = () => {
  const [data, _loading, _error, _sendData] = useAxios({
    axiosInstance: api,
    method: 'get',
    url: '/properties/random/list',
  });

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <>
      <Banner />
      <Announce />
      <Company />
      {data && <Opportunities properties={data} />}
    </>
  );
};

export default Home;
