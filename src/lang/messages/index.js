import en from './en';
import vi from './vi';
import { convertLongKeyValues } from '../lib';

const messages = {
  en: convertLongKeyValues(en),
  vi: convertLongKeyValues(vi)
};

export default messages;
