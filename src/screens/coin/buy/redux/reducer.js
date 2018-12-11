import { ADD_PENDING_ORDER, CLEAR_PENDING_ORDER } from './type';

const initState = {
  pendingOrder: null
};

export default (state = initState, { type, data }) => {
  switch (type) {
    case ADD_PENDING_ORDER:
      return {
        ...state,
        pendingOrder: data,
      };
    case CLEAR_PENDING_ORDER:
      return {
        ...state,
        pendingOrder: null
      };
    default:
      return state;
  }
};
