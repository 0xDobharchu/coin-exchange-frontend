import i18n from 'coinexchangei18n';
import en from './en';
// import vi from './vi';
import { convertLongKeyValues } from '../lib';

const messages = {
  en: convertLongKeyValues(en),
  // vi: convertLongKeyValues(Object.assign({}, en, i18n.vi)),
  // vi: convertLongKeyValues(vi)
  id: convertLongKeyValues(Object.assign({}, en, i18n.id)),
  km: convertLongKeyValues(Object.assign({}, en, i18n.km)),
  'zh-Hant-HK': convertLongKeyValues(Object.assign({}, en, i18n.zh))
};

export default messages;
