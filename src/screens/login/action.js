import { makeRequest } from 'src/redux/action';
import { URL } from 'src/resources/constants/url';
import { USER } from 'src/resources/constants/user';
import { LOGIN } from './type';

export const login = (username, password) => (dispatch) => {
  const makeLogin = makeRequest({
    type: LOGIN,
    url: URL.USER_LOGIN,
    method: 'POST',
    data: {
      username,
      password
    }
  }, dispatch);
  return makeLogin().then((res) => {
    if (res.refresh && res.access) {
      localStorage.setItem(USER.ACCESS_TOKEN, res.access);
      localStorage.setItem(USER.REFRESH_TOKEN, res.refresh);
    } else {
      alert('OH! something went wrong!');
    }
    return USER.LOGIN_SUCCESS;
  }, (err) => {
    console.log(err);
    alert('Username password do not match');
    return USER.LOGIN_FAILURE;
  });
};
