export const API_BASE = 'https://httpbin.org';
export const API_URL = {
  INTERNAL: {
    GET_WITHDRAW_LIST: 'exchange/internal/credit/withdraw',
    COMPLETE_WITHDRAW: 'exchange/internal/credit/withdraw',
    GET_CASH_ORDER: 'exchange/cash/order', // `GET /cash/order?status=processing|tranferring|success`
    GET_COIN_ORDER: 'exchange/coin/order', // `GET /cash/order?status=processing|tranferring|success`
    GET_SELLING_COIN_ORDER: 'exchange/coin/selling-order', // `GET /cash/order?status=processing|tranferring|success`
    REVIEW_COIN_ORDER: 'exchange/coin/review', // `GET /cash/order?status=processing|tranferring|success`
  },
};
