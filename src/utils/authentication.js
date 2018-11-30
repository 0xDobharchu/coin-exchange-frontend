import {USER} from 'src/resources/constants/user';

const currentUser = {
  isLogin() {
    if(__CLIENT__) {
      const token = currentUser.getToken();
      return !!token;
    }
    return false;
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
    if(!__CLIENT__) return {};

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
};
export default currentUser;
