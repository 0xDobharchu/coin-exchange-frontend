import {USER} from 'src/resources/constants/user';
import {APP} from '../constants';

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
  getRefreshToken() {
    if(!__CLIENT__) return null;
    return localStorage.getItem(USER.REFRESH_TOKEN) || null;
  },
  getCurrentUser() {
    if(!__CLIENT__) return null;

    return JSON.parse(localStorage.getItem(USER.CURRENT_PROFILE)) || {};
  },
  setAccessToken(token) {
    if(__CLIENT__){
      localStorage.setItem(USER.ACCESS_TOKEN, token);
    }
  },
  setRefreshToken(refreshToken) {
    if(__CLIENT__){
      localStorage.setItem(USER.REFRESH_TOKEN, refreshToken);
    }
  },
  setCurrentUser(user) {
    if(__CLIENT__){
      localStorage.setItem(USER.CURRENT_PROFILE, JSON.stringify(user));
    }
  },
  removeAccessToken() {
    if(__CLIENT__){
      localStorage.removeItem(USER.ACCESS_TOKEN);
      localStorage.removeItem(USER.REFRESH_TOKEN);
      localStorage.removeItem(USER.CURRENT_PROFILE);
    }
  },
  getIPInfor() {
    if(__CLIENT__){
      return JSON.parse(localStorage.getItem(APP.IP_INFO)) || {};
    }
  }
};
export default currentUser;
