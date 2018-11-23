import { makeRequest } from 'src/redux/action';
import CoinModel from 'src/models/coin';
import { API_URL } from 'src/resources/constants/url';
import { MAKE_ORDER, GEN_ADDRESS } from './type';

export const makeOrder = (data) => dispatch => {
  const req = makeRequest({
    type: MAKE_ORDER,
    url: API_URL.COIN.MAKE_ORDER,
    data,
    method: 'POST'
  }, dispatch);
  return req().then(res => CoinModel.coinOrderRes(res));
};

export const genAddress = (currency) => makeRequest({
  type: GEN_ADDRESS,
  url: `${API_URL.COIN.GEN_ADDRESS}?currency=${currency}`,
  method: 'post',
});

export const checkAddress = ({address, currency}) => dispatch => {
  const req = makeRequest({
    type: GEN_ADDRESS,
    url: `${API_URL.COIN.CHECK_ADDRESS}?currency=${currency}&address=${address}`,
  }, dispatch);
  return req().then(res => CoinModel.checkGeneratedAddressRes(res));
};
