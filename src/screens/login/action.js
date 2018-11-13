import { makeRequest } from 'src/redux/action';
import { LOGIN } from './type';

function login(username, password) {
  return makeRequest({
    type: LOGIN,
    url: '/json',
    data: {
      username,
      password
    }
  });
}

function logout() {
  return { type: true };
}

export const userActions = {
  login,
  logout,
};
