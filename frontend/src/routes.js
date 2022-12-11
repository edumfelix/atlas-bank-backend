import { Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';

import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import RegisterUserPage from './pages/RegisterUserPage';
import IncrementBalancePage from './pages/IncrementBalancePage';
import DecrementBalancePage from './pages/DecrementBalancePage';

import { useAuthContext } from './hooks/useAuthContext';

const ProtectedRoutePage = ({ Item }) => {
  const { userData } = useAuthContext();

  return typeof userData !== 'object' ? <LoginPage /> : <Item />;
};

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <ProtectedRoutePage Item={DashboardLayout} />,
      children: [
        { element: <Navigate to='/dashboard/app' />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'deposit', element: <IncrementBalancePage /> },
        { path: 'withdrawal', element: <DecrementBalancePage /> },
      ],
    },
    {
      path: '/signin',
      element: <LoginPage />,
    },
    { path: '/user/register', element: <RegisterUserPage /> },
    {
      element: <ProtectedRoutePage Item={SimpleLayout} />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
