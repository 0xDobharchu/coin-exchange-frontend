import { makeRequest } from 'src/redux/action';
import {ADD_CONTACT} from './type';

function addContact(name, phone, email, description) {
  return makeRequest({
    type: ADD_CONTACT,
    url: '/system/contacts/',
    method: 'POST',
    data: {
      name, phone, email, description
    }
  });
}

export const contactActions = {
  addContact
};
