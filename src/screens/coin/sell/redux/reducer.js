import { GEN_ADDRESS, ADD_PENDING_ORDER, CLEAR_PENDING_ORDER } from './type';

const initState = {
  generatedAddress: null,
  pendingOrder: null
};

export default (state = initState, action) => {
  switch (action.type) {
    case `${GEN_ADDRESS}_SUCCESS`:
      return { ...state, generatedAddress: action?.data };
    case CLEAR_PENDING_ORDER:
      return initState;
    case ADD_PENDING_ORDER:
      return { ...state, pendingOrder: action?.data };
    default:
      return state;
  }
};
