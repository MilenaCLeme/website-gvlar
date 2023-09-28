import DefaulPage from '@/components/DefaulPage';
import DefaulPageADM from '@/components/DefaulPageADM';
import ProtectedRoute from '@/components/ProtectedRoute';
import ChangePassword from '@/page/ADM/ChangePassword';
import MyData from '@/page/ADM/MyData';
import MyProperty from '@/page/ADM/MyProperty';
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
          <Route path='adm' element={<DefaulPageADM />}>
            <Route
              index
              element={
                <ProtectedRoute>
                  <MyData />
                </ProtectedRoute>
              }
            />
            <Route
              path='senha'
              element={
                <ProtectedRoute>
                  <ChangePassword />
                </ProtectedRoute>
              }
            />
            <Route
              path='imoveis'
              element={
                <ProtectedRoute>
                  <MyProperty />
                </ProtectedRoute>
              }
            />
          </Route>
        </Route>
      </Routes>
    </main>
  );
};

export default Router;
