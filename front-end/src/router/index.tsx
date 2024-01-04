import DefaulPage from '@/components/DefaulPage';
import DefaulPageADM from '@/components/DefaulPageADM';
import DefaulPageADMMaster from '@/components/DefaulPageADMMaster';
import ProtectedRoute from '@/components/ProtectedRoute';
import ChangePassword from '@/page/ADM/ChangePassword';
import Properties from '@/page/ADM/Control/Properties';
import Users from '@/page/ADM/Control/Users';
import MyData from '@/page/ADM/MyData';
import MyProperty from '@/page/ADM/MyProperty';
import AboutGVLar from '@/page/AboutGVLar';
import EmailVerification from '@/page/EmailVerification';
import Filter from '@/page/Filter';
import ForgetPassword from '@/page/ForgetPassword';
import Home from '@/page/Home';
import LoginAndRegister from '@/page/LoginAndRegister';
import NotFound from '@/page/NotFound';
import PropertyId from '@/page/PropertyId';
import ResetPassword from '@/page/ResetPassword';
import TermsOfUse from '@/page/TermsOfUse';
import { Navigate, Route, Routes } from 'react-router-dom';

const Router = () => {
  return (
    <main className='container'>
      <Routes>
        <Route path='/verificar/email/:id' element={<EmailVerification />} />
        <Route path='/404' element={<NotFound />} />
        <Route path='/termos' element={<TermsOfUse />} />
        <Route path='/' element={<DefaulPage />}>
          <Route index element={<Home />} />
          <Route path='sobrenos' element={<AboutGVLar />} />
          <Route path='encontrar/imovel' element={<Filter />} />
          <Route path='encontrar/imovel/:id' element={<PropertyId />} />
          <Route path='verificar/email' element={<ForgetPassword />} />
          <Route path='resetar/senha/:id' element={<ResetPassword />} />
          <Route
            path='login'
            element={
              <ProtectedRoute>
                <LoginAndRegister />
              </ProtectedRoute>
            }
          />
          <Route
            path='adm'
            element={
              <ProtectedRoute>
                <DefaulPageADM />
              </ProtectedRoute>
            }
          >
            <Route index element={<MyData />} />
            <Route path='senha' element={<ChangePassword />} />
            <Route path='imoveis' element={<MyProperty />} />
            <Route path='controle' element={<DefaulPageADMMaster />}>
              <Route path='usuario' element={<Users />} />
              <Route path='imoveis' element={<Properties />} />
            </Route>
          </Route>
        </Route>
        <Route path='*' element={<Navigate to='/404' />} />
      </Routes>
    </main>
  );
};

export default Router;
