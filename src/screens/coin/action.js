import { makeRequest } from 'src/redux/action';
import { API_URL } from 'src/resources/constants/url';
import { GET_REVIEW, GET_BUY_PRICE, GET_SELL_PRICE } from './type';

export const getReview = (data) => makeRequest({
  type: GET_REVIEW,
  url: `/${API_URL.EXCHANGE.REVIEWS}`,
  params: data.params
});

export const coinGetSellPrice = () => makeRequest({
  type: GET_SELL_PRICE,
  url: '',
});

export const coinGetBuyPrice = () => makeRequest({
  type: GET_BUY_PRICE,
  url: '',
});
