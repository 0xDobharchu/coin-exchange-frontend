import { URL } from 'src/resources/constants/url';
import Contact from 'src/screens/contact';
import About from 'src/screens/about';
import Login from 'src/screens/login';
import Register from 'src/screens/register';
import forgetPassword from 'src/screens/forgetPassword';
import forgetPasswordFinish from 'src/screens/forgetPassword/finish';
import Coin from 'src/screens/coin';
import Me from 'src/screens/me/pages/Me';
import Wallet from 'src/screens/wallet';
import CoinBowlFAQ from 'src/screens/landingpage/CoinBowlFAQ';
import AgreementPrivacy from 'src/screens/agreementPrivacy';
import PromotionProgram from 'src/screens/promotionProgram';
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
    component: Coin,
    exact: true,
  },
  {
    path: URL.FAQ_URL,
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
    path: URL.USER_SIGN_IN,
    component: Login,
    exact: true,
  },
  {
    path: URL.USER_SIGN_UP,
    component: Register,
    exact: true,
  },
  {
    path: URL.USER_FORGET_PASSWORD,
    component: forgetPassword,
    exact: true,
  },
  {
    path: URL.USER_FORGET_PASSWORD_FINISH,
    component: forgetPasswordFinish,
    exact: true,
  },
  {
    path: URL.ME,
    component: Me,
    exact: true,
    auth: true,
  },
  {
    path: URL.ME_PROFILE,
    component: Me,
    exact: true,
    auth: true,
  },
  {
    path: URL.ME_SETTING,
    component: Me,
    exact: true,
    auth: true,
  },
  {
    path: URL.ME_ACCOUNT_LEVEL,
    component: Me,
    exact: true,
    auth: true,
  },
  {
    path: URL.ME_HISTORY,
    component: Me,
    exact: true,
    auth: true,
  },
  {
    path: URL.ME_BANK_INFO,
    component: Me,
    exact: true,
    auth: true,
  },
  {
    path: '/wallet/:address?',
    component: Wallet,    
    exact: false,
    strict: false,
  },
  {
    path: URL.AGREEMENT,
    component: AgreementPrivacy,
    exact: true,
  },
  {
    path: URL.PROMOTION_PROGRAM,
    component: PromotionProgram,
    exact: true,
  }
];

export default routes;
export const RouteWrapper = routeWrapper;
export const RenderRoutes = renderRoutes;
export const PrivateRoute = privateRoute;
