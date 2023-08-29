import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import style from './defaulPage.module.scss';

const DefaulPage = () => {
  return (
    <>
      <Header />
      <main className={style.main}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default DefaulPage;
