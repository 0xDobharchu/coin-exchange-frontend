import { makeRequest } from 'src/redux/action';
import {API_URL} from 'src/resources/constants/url';
import {ADD_REVIEW} from './type';

function addReview(order, review) {
  console.log(order, review);
  return makeRequest({
    type: ADD_REVIEW,
    url: API_URL.EXCHANGE.REVIEWS,
    method: 'POST',
    data: {
      order, review
    }
  });
}

export default addReview;
