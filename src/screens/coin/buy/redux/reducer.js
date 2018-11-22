// import { GET_REVIEW } from './type';

const initState = {
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case 'SUCCESS':
      return {
        ...state,
        numReview: payload,
      };
    default:
      return state;
  }
};
