import { makeRequest } from 'src/redux/action';
import { API_URL } from 'src/resources/constants/url';
import {RESET_PASSWORD, RESET_PASSWORD_FINISH} from './type';

function resetPass(email) {
  return makeRequest({
    type: RESET_PASSWORD,
    url: API_URL.USER.USER_FORGET_PASSWORD,
    method: 'POST',
    data: {
      email
    }
  });
}

function resetPassFinish(token, password) {
  return makeRequest({
    type: RESET_PASSWORD_FINISH,
    url: API_URL.USER.USER_FORGET_PASSWORD_FINISH,
    method: 'POST',
    data: {
      token,
      password
    }
  });
}

const resetPassActions = {
  resetPass,
  resetPassFinish
};
export default resetPassActions;
