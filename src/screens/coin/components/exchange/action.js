import { makeRequest } from 'src/redux/action';
import { API_URL } from 'src/resources/constants/url';
import CoinModel from 'src/models/coin';
import { GET_QUOTE } from './type';

export const getQuote = ({ params, withAuth = false }) => dispatch => {
  const req = makeRequest({
    withAuth,
    type: GET_QUOTE,
    url: API_URL.COIN.GET_QUOTE,
    params
  }, dispatch);
  return req().then(res => {
    const coinData = CoinModel.coinQuote(res);
    return coinData;
  });
};

export const getQuoteReverse = ({ params, withAuth = false }) => dispatch => {
  const req = makeRequest({
    withAuth,
    type: GET_QUOTE,
    url: API_URL.COIN.GET_QUOTE_REVERSE,
    params
  }, dispatch);
  return req().then(res => {
    const coinData = CoinModel.coinQuote(res);
    return coinData;
  });
};
