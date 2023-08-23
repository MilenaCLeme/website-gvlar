import DefaulPage from '@/components/DefaulPage';
import LoginAndRegister from '@/page/LoginAndRegister';
import { Route, Routes } from 'react-router-dom';

const Router = () => {
  return (
    <main className='container'>
      <Routes>
        <Route path='/' element={<DefaulPage />}>
          <Route path='login' element={<LoginAndRegister />} />
        </Route>
      </Routes>
    </main>
  );
};

export default Router;
