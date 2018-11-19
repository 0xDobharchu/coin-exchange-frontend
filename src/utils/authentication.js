import {USER} from 'src/resources/constants/user';

const currentUser = {
  isLogin() {
    const token = currentUser.getToken();
    return !!token;
  },
  getToken() {
    return localStorage.getItem(USER.ACCESS_TOKEN);
  },
  getRefeshToken() {
    return localStorage.getItem(USER.REFRESH_TOKEN);
  }
};
export default currentUser;
