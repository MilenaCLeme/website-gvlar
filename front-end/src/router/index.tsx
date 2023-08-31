import DefaulPage from '@/components/DefaulPage';
import ProtectedRoute from '@/components/ProtectedRoute';
import LoginAndRegister from '@/page/LoginAndRegister';
import { Route, Routes } from 'react-router-dom';

const Router = () => {
  return (
    <main className='container'>
      <Routes>
        <Route path='/' element={<DefaulPage />}>
          <Route
            path='login'
            element={
              <ProtectedRoute>
                <LoginAndRegister />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </main>
  );
};

export default Router;
