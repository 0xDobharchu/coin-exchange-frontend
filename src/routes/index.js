import Home from 'src/screens/home';
import Contact from 'src/screens/contact';
import Login from 'src/screens/login';
import Register from 'src/screens/register';
import Coin from 'src/screens/coin';
import Localization from 'src/screens/localization';
import Me from 'src/screens/me';
// import Wallet from 'src/screens/wallet';
import routeWrapper from './routeWraper';
import renderRoutes from './renderRoutes';

const routes = [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/coin',
    component: Coin,
    exact: true,
  },
  {
    path: '/contact',
    component: Contact,
    exact: true,
  },
  {
    path: '/login',
    component: Login,
    exact: true,
  },
  {
    path: '/register',
    component: Register,
    exact: true,
  },
  {
    path: '/contact/a',
    component: Home,
    exact: true,
  },
  {
    path: '/localization',
    component: Localization,
    exact: true,
  },
  {
    path: '/me',
    component: Me,
    exact: true,
  },
  // {
  //   path: '/wallet',
  //   component: Wallet,
  //   exact: true,
  // }
];

export default routes;
export const RouteWrapper = routeWrapper;
export const RenderRoutes = renderRoutes;
