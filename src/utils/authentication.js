import {USER} from 'src/resources/constants/user';

const currentUser = {
  isLogin() {
    const token = currentUser.getToken();
    return !!token;
  },
  getToken() {
    if(__CLIENT__){
      return localStorage.getItem(USER.ACCESS_TOKEN) || null;
    }
    return null;
  },
  getRefeshToken() {
    if(!__CLIENT__) return null;
    return localStorage.getItem(USER.REFRESH_TOKEN) || null;
  },
  getCurrentUser() {
    if(!__CLIENT__) return null;
    return JSON.parse(localStorage.getItem(USER.CURRENT_PROFILE)) || null;
  }
};
export default currentUser;
