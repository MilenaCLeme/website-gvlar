import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import style from './defaulPage.module.scss';

const DefaulPage = () => {
  return (
    <>
      <Header />
      <div className={style.main}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default DefaulPage;
