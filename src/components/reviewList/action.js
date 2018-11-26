import {makeRequest} from 'src/redux/action';
import {API_URL} from 'src/resources/constants/url';
import {GET_REVIEW} from './type';

export const getReview = (data) => makeRequest({
  type: GET_REVIEW,
  url: `/${API_URL.EXCHANGE.REVIEWS}`,
  params: data.params
});
