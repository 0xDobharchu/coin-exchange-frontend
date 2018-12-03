import { makeRequest } from 'src/redux/action';
import { API_URL } from 'src/resources/constants/url';
import {ADD_CONTACT} from './type';

function addContact(name, phone_number, email, description) {
  return makeRequest({
    type: ADD_CONTACT,
    url: API_URL.SYSTEM.SUBMIT_CONTACT,
    method: 'POST',
    withAuth: false,
    data: {
      name, phone_number, email, description
    }
  });
}

const contactActions = {
  addContact
};
export default contactActions;
