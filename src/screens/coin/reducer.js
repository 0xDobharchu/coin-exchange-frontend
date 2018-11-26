import Coin from 'src/models/coin';
import { GET_REVIEW, GET_SELL_PRICE, GET_BUY_PRICE } from './type';

const initState = {
  numReview: 0,
  sellPrice: {},
  buyPrice: {},
};

export default (state = initState, action) => {
  switch (action.type) {
    case `${GET_REVIEW}_SUCCESS`:
      return {
        ...state,
        numReview: action.payload.data.count,
        reviewList:  action.payload.data.results,
      };
    case `${GET_BUY_PRICE}_SUCCESS`:
      if (action?.data) {
        const coinInfo = Coin.coinQuote(action?.data);
        return {
          ...state,
          buyPrice: {
            ...state.buyPrice,
            [action?.more?.name]: coinInfo,
          },
        };
      }
      break;
    case `${GET_SELL_PRICE}_SUCCESS`:
      if (action?.data) {
        const coinInfo = Coin.coinQuote(action?.data);
        return {
          ...state,
          sellPrice: {
            ...state.sellPrice,
            [action?.more?.name]: coinInfo,
          },
        };
      }
      break;
    default:
      return state;
  }
};
