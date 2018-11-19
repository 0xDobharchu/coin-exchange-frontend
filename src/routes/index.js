import { URL } from 'src/resources/constants/url';
import Home from 'src/screens/home';
import Contact from 'src/screens/contact';
import About from 'src/screens/about';
import Login from 'src/screens/login';
import Register from 'src/screens/register';
import Coin from 'src/screens/coin';
import Localization from 'src/screens/localization';
import Me from 'src/screens/me';
// import Wallet from 'src/screens/wallet';
import CoinBowlFAQ from 'src/screens/landingpage/CoinBowlFAQ';
import MeProfile from 'src/screens/me/pages/MeProfile';
import routeWrapper from './routeWraper';
import renderRoutes from './renderRoutes';
import privateRoute from './privateRoute';

/**
 * {
    path: '/some-path',
    component: YourComponent,
    componentProps: { name: 'Component Name' },
    auth: bool ==> need to auth to see this view
    noContainer: bool ==> wrapper container with header & footer
    ...react-router props
  },
 */
const routes = [
  {
    path: URL.HOME,
    component: Home,
    componentProps: { title: 'Oh yeah!' },
    exact: true,
  },
  {
    path: URL.COIN,
    component: Coin,
    exact: true,
  },
  {
    path: URL.FAQ,
    component: CoinBowlFAQ,
    exact: true,
  },
  {
    path: URL.CONTACT,
    component: Contact,
    exact: true,
  },
  {
    path: URL.ABOUT_US,
    component: About,
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
    path: '/localization',
    component: Localization,
    exact: true,
  },
  {
    path: '/me',
    component: Me,
    exact: true,
    auth: true,
  },
  // {
  //   path: '/wallet',
  //   component: Wallet,
  //   exact: true,
  // },
  {
    path: URL.HANDSHAKE_ME_PROFILE,
    component: MeProfile,
    exact: true,
  }
];

export default routes;
export const RouteWrapper = routeWrapper;
export const RenderRoutes = renderRoutes;
export const PrivateRoute = privateRoute;
