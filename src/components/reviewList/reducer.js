import { GET_REVIEW } from './type';

const initState = {
  numReview: 0,
  sellPrice: {},
  buyPrice: {},
};

export default (state = initState, { type, data }) => {
  switch (type) {
    case `${GET_REVIEW}_SUCCESS`:
      return {
        ...state,
        numReview: data.count,
        reviewList:  data.results,
      };
    default:
      return state;
  }
};
