import { REGISTER } from './type';
import { makeRequest } from '../../redux/action';

function register(user) {
  return makeRequest({
    type: REGISTER,
    url: '/json',
    data: user
  });
}
export const userActions = {
  register,
};
