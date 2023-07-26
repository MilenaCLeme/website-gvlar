import DefaulPageADM from '@/components/DefaulPageADM';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Filter from '@/page/Filter';
import Home from '@/page/Home';
import LoginAndRegister from '@/page/LoginAndRegister';
import MyData from '@/page/MyData';
import { Route, Routes } from 'react-router-dom';

const Router = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/encontrar' element={<Filter />} />
        <Route path='/login' element={<LoginAndRegister />} />
        <Route path='/adm' element={<DefaulPageADM />}>
          <Route index element={<MyData />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

export default Router;
