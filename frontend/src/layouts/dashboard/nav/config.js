// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

export const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'product',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'blog',
    path: '/dashboard/blog',
    icon: icon('ic_blog'),
  },
  {
    title: 'login',
    path: '/signin',
    icon: icon('ic_lock'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export const navConfigManager = [
  {
    title: 'home',
    path: '/dashboard/app', //modify
    icon: icon('ic_analytics'),
  },
  {
    title: 'Usuários',
    path: '/dashboard/app', //modify
    icon: icon('ic_analytics'),
  },
  {
    title: 'Empréstimos',
    path: '/dashboard/app', //modify
    icon: icon('ic_analytics'),
  },
];

export const navConfigAdm = [
  {
    title: 'home',
    path: '/dashboard/app', //modify
    icon: icon('ic_analytics'),
  },
  {
    title: 'Usuários',
    path: '/dashboard/app', //modify
    icon: icon('ic_analytics'),
  },
  {
    title: 'Gerentes',
    path: '/dashboard/app', //modify
    icon: icon('ic_analytics'),
  },
  {
    title: 'Empréstimos',
    path: '/dashboard/app', //modify
    icon: icon('ic_analytics'),
  },
];