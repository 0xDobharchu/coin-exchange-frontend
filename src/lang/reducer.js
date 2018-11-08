const CHANGE_LANG = 'CHANGE_LANG';
const initState = {
  lang: 'en',
};

export default (state = initState, { type, payload }) => {
  switch(type) {
    case CHANGE_LANG: 
      return {
        lang: payload
      };
  default:
    return state;
  }
};
