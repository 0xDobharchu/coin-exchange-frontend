import local from 'src/services/localStore';
import { APP } from 'src/constants';

const CHANGE_LANG = 'CHANGE_LANG';
const initState = {
  lang: local.get(APP.LOCALE) || 'en'
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case CHANGE_LANG:
      local.save(APP.LOCALE, payload);
      return {
        lang: payload
      };
    default:
      return state;
  }
};
