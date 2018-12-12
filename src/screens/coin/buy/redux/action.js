import { makeRequest } from 'src/redux/action';
import CoinModel from 'src/models/coin';
import { API_URL } from 'src/resources/constants/url';
import { MAKE_ORDER, ADD_PENDING_ORDER, CLEAR_PENDING_ORDER } from './type';

export const makeOrder = (data) => dispatch => {
  const req = makeRequest({
    type: MAKE_ORDER,
    url: API_URL.COIN.MAKE_ORDER,
    data,
    method: 'POST'
  }, dispatch);
  return req().then(res => CoinModel.coinOrderRes(res));
};

export const addPendingOrder = data => {
  if (!data) throw new Error('Missing pending order data!');
  return {
    type: ADD_PENDING_ORDER,
    data
  };
};

export const clearPendingOrder = () => ({
  type: CLEAR_PENDING_ORDER,
});