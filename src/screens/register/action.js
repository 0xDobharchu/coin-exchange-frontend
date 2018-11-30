import { makeRequest } from 'src/redux/action';
import { API_URL } from 'src/resources/constants/url';
import { USER } from 'src/resources/constants/user';
import { MasterWallet } from 'src/services/Wallets/MasterWallet';
import { REGISTER, COUNTRY } from './type';
import {login} from '../login/action';

const makeSaveWallet = (masterWallet, dispatch) => makeRequest({
  type: REGISTER,
  url: API_URL.USER.USER_WALLET,
  method: 'PUT',
  data: {wallet: JSON.stringify(masterWallet)}
}, dispatch);

export const getCountries = (dispatch) => {
  return makeRequest({
    type: COUNTRY,
    url: API_URL.SYSTEM.COUNTRY,
    method: 'get',
  }, dispatch);
};

export const register = user => (dispatch) => {
  const makeRegister = makeRequest({
    type: REGISTER,
    url: API_URL.USER.USER_SIGN_UP,
    method: 'POST',
    data: user
  }, dispatch);
  return makeRegister().then(() => {
    return login(user.username, user.password)(dispatch).then((loginRes) => {
      if (loginRes.type === USER.LOGIN_SUCCESS) {
        const masterWallet = MasterWallet.createMasterWallets(user.password);
        return makeSaveWallet(masterWallet, dispatch)().then(() => {
          return USER.REGISTER_SUCCESS;
        });
      } else {
        return USER.REGISTER_FAILURE;
      }
    });
  }, (err) => {
    console.log(err);
    return err;
  });
};
