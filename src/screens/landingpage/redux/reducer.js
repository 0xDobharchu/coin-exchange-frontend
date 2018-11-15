import LANDINGPAGE_ACTION from './type';

const initState = {
  faqContent: [],
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case `${LANDINGPAGE_ACTION.GET_FAQ_CONTENT}_SUCCESS`: {
      console.log('GET_FAQ_CONTENT', payload);
      return {
        ...state,
        faqContent: payload,
      };
    }
    default:
      return state;
  }
};
