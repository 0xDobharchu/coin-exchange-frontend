import local from 'src/services/localStore';
import { APP } from 'src/resources/constants/app';
import { FAIL_DEFAULT_LANGUAGE } from 'src/resources/constants/languages';

const CHANGE_LANG = 'CHANGE_LANG';
const initState = {
  lang: local.get(APP.LOCALE) || FAIL_DEFAULT_LANGUAGE
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
