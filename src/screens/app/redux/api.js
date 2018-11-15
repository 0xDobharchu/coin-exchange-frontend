import axios from 'axios';

export const signUp = async () => {
  try {
    console.log('Get new user');
    const { status, data: { data: { passpharse } } } = await axios.post('https://ninja.org/api/user/sign-up', {});
    if (status === 200) {
      return passpharse;
    }
    return null;
  } catch (err) {
    console.log('ERROR WHEN SIGNUP', err);
    return null;
  }
};
