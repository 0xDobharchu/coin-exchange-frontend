import USER from 'src/resources/constants/user';

const currentUser = {
  isLogined() {
    const token = localStorage.getItem(USER.ACCESS_TOKEN);
    return !!token;
  },
  getToken() {
    const token = localStorage.getItem(USER.ACCESS_TOKEN);
    return token;
  },
  getRefeshToken() {
    const token = localStorage.getItem(USER.REFRESH_TOKEN);
    return token;
  }
};
export default currentUser;
