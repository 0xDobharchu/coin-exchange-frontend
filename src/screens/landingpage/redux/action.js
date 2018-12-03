import { makeRequest } from 'src/redux/action';
import { API_URL } from 'src/resources/constants/url';
import LANDINGPAGE_ACTION from './type';

export const getFaqContent = (data) => makeRequest({
  type: LANDINGPAGE_ACTION.GET_FAQ_CONTENT,
  url: `${API_URL.LANDING.FAQ}`,
  params: data.params,
  withAuth: false
});

export const getUserAgreementContent = (data) => makeRequest({
  type: LANDINGPAGE_ACTION.GET_USER_AGREEMENT_CONTENT,
  url: `${API_URL.LANDING.STATIC_PAGE}`,
  params: data.params,
  withAuth: false
});

export const getPrivacyContent = (data) => makeRequest({
  type: LANDINGPAGE_ACTION.GET_PRIVACY_CONTENT,
  url: `${API_URL.LANDING.STATIC_PAGE}`,
  params: data.params,
  withAuth: false
});

export const getPromotionContent = (data) => makeRequest({
  type: LANDINGPAGE_ACTION.GET_PROMOTION_CONTENT,
  url: `${API_URL.LANDING.STATIC_PAGE}`,
  params: data.params,
  withAuth: false
});
