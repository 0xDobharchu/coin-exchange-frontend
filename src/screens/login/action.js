import { history } from '../../utils/history';

function login(username, password) {
  function success(user) { return { type: 'USERS_LOGIN_SUCCESS', user }; }
  return (dispatch) => {
    new Promise(((resolve) => {
      setTimeout(() => {
        resolve({ user: { username, password } });
      }, 300);
    })).then(
      (user) => {
        dispatch(success(user));
        history.push('/');
        console.log(123);
      },
      (error) => {
        console.log(error);
      }
    );
  };
}

function logout() {
  return { type: true };
}

export const userActions = {
  login,
  logout,
};
