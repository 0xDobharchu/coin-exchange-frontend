import { LOGIN } from './type';

const initState = {
  isAuthenticated: false
};

export default (state = initState, action) => {
  switch (action.type) {
    case `${LOGIN}_SUCCESS`:
      return {
        ...state,
        isAuthenticated: true
      };
    default:
      return state;
  }
};
