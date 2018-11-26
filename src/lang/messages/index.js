import i18n from 'handshake-i18n';
import en from './en';
import { convertLongKeyValues } from '../lib';

const messages = {
  en: convertLongKeyValues(en),
  'zh-Hant-HK': Object.assign({}, en, i18n.zh_hk),
};

export default messages;
