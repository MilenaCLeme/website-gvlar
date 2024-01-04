import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import style from './defaulPage.module.scss';
import classNames from 'classnames';

const DefaulPage = () => {
  const { pathname } = useLocation();
  return (
    <>
      <Header />
      <main className={classNames({ [style.main]: true, [style.home]: pathname === '/' })}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default DefaulPage;
