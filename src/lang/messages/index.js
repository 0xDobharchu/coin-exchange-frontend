import i18n from 'handshake-i18n';
import en from './en';
// import vi from './vi';
import { convertLongKeyValues } from '../lib';

const messages = {
  en: convertLongKeyValues(en),
  vi: convertLongKeyValues(Object.assign({}, en, i18n.vi))
  // vi: convertLongKeyValues(vi)
};

export default messages;
