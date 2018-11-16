import { makeRequest } from 'src/redux/action';
import { API_URL } from 'src/resources/constants/url';
import LANDINGPAGE_ACTION from './type';

export const getFaqContent = (data) => makeRequest({
  type: LANDINGPAGE_ACTION.GET_FAQ_CONTENT,
  url: `/${API_URL.LANDING.FAQ}`,
  params: data.params
});
