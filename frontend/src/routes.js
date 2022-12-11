import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import RegisterUserPage from './pages/RegisterUserPage';
import RegisterManagerPage from './pages/RegisterManagerPage';

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
        { path: 'user', element: <UserPage /> },
        { path: 'manager/register', element: <RegisterManagerPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: 'login',
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
