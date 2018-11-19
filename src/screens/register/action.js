import { makeRequest } from 'src/redux/action';
import { API_URL } from 'src/resources/constants/url';
import { USER } from 'src/resources/constants/user';
import { MasterWallet } from 'src/services/Wallets/MasterWallet';
import { REGISTER } from './type';
import {LOGIN} from '../login/type';

const makeLogin = (username, password, dispatch) => makeRequest({
  type: LOGIN,
  url: API_URL.USER.USER_SIGN_IN,
  method: 'POST',
  data: {
    username,
    password
  }
}, dispatch);

const makeSaveWallet = (masterWallet, dispatch) => makeRequest({
  type: REGISTER,
  url: API_URL.USER.USER_WALLET,
  method: 'PUT',
  data: {wallet: JSON.stringify(masterWallet)}
}, dispatch);

export const register = user => (dispatch) => {
  const makeRegister = makeRequest({
    type: REGISTER,
    url: API_URL.USER.USER_SIGN_UP,
    method: 'POST',
    data: user
  }, dispatch);
  return makeRegister().then(() => {
    return makeLogin(user.username, user.password, dispatch)().then((loginRes) => {
      localStorage.setItem(USER.ACCESS_TOKEN, loginRes.access);
      const masterWallet = MasterWallet.createMasterWallets(user.password);
      return makeSaveWallet(masterWallet, dispatch)().then(()=>{
        localStorage.removeItem(USER.ACCESS_TOKEN);
        return USER.REGISTER_SUCCESS;
      });
    });
  }, (err) => {
    console.log(err);
    alert(err);
    return USER.LOGIN_FAILURE;
  });
};
