import { Context } from '@/context';
import { ReactNode, useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }: ProtectedRouteProps) => {
  const { token } = useContext(Context);
  const { pathname } = useLocation();

  if (token !== '' && pathname === '/login') {
    return <Navigate to='/adm' replace />;
  }

  if (token === '' && pathname !== '/login') {
    return <Navigate to='/login' replace />;
  }

  return children;
};

export default ProtectedRoute;
