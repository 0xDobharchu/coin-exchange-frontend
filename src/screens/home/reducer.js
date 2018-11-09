import { MOUNT } from './type';

const initState = {
  time: null,
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case MOUNT:
      return {
        ...state,
        time: payload?.time,
      };
    default:
      return state;
  }
};
