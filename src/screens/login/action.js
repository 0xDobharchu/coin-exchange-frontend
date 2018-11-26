import { makeRequest } from 'src/redux/action';
import { API_URL } from 'src/resources/constants/url';
import { USER } from 'src/resources/constants/user';
import authentication from 'src/utils/authentication';
import { LOGIN } from './type';

const makeGetProfile = (dispatch) => makeRequest({
  type: LOGIN,
  url: API_URL.USER.USER_PROFILE,
  method: 'GET'
}, dispatch);

export const login = (username, password) => (dispatch) => {
  const makeLogin = makeRequest({
    type: LOGIN,
    url: API_URL.USER.USER_SIGN_IN,
    method: 'POST',
    data: {
      username,
      password
    }
  }, dispatch);
  return makeLogin().then((res) => {
    if (res.refresh && res.access && __CLIENT__) {
      authentication.setAccessToken(res.access);
      authentication.setRefreshToken(res.refresh);
      return makeGetProfile(dispatch)().then((profile) => {
        const user = {name: profile.name, email: profile.email};
        authentication.setCurrentUser(user);
        return USER.LOGIN_SUCCESS;
      });
    } else {
      return USER.LOGIN_FAILURE;
    }
  }, (err) => {
    console.log(err);
    return USER.LOGIN_FAILURE;
  });
};
