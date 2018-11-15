import { makeRequest } from 'src/redux/action';
import LANDINGPAGE_ACTION from './type';
import { API_URL } from '@/constants';

export const getFaqContent = () => makeRequest({
  type: LANDINGPAGE_ACTION.GET_FAQ_CONTENT,
  url: `/${API_URL.LANDING.FAQ}`,
});
