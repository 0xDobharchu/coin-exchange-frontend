import { makeRequest } from 'src/redux/action';
import { API_URL } from 'src/resources/constants/url';
import { GEN_ADDRESS, ADD_PENDING_ORDER, CLEAR_PENDING_ORDER } from './type';

export const genAddress = (currency) => makeRequest({
  type: GEN_ADDRESS,
  url: `${API_URL.COIN.GEN_ADDRESS}?currency=${currency}`,
  method: 'post',
});

export const addPendingOrder = (data) => {
  if (!data) throw new Error('Missing pending order data!');
  return {
    type: ADD_PENDING_ORDER,
    data
  };
};

export const clearPendingOrder = () => ({
  type: CLEAR_PENDING_ORDER,
});