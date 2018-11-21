import { makeRequest } from 'src/redux/action';
import { API_URL } from 'src/resources/constants/url';
import { MAKE_ORDER, GEN_ADDRESS } from './type';

export const makeOrder = (data) => makeRequest({
  type: MAKE_ORDER,
  url: API_URL.COIN.MAKE_ORDER,
  data,
  method: 'POST'
});

export const genAddress = (currency) => makeRequest({
  type: GEN_ADDRESS,
  url: `${API_URL.COIN.GEN_ADDRESS}?currency=${currency}`,
  method: 'post',
});
