import { MOUNT, TEST_GET_DATA_ASYNC } from './type';
import { makeRequest } from 'src/redux/action';
import { Promise } from 'core-js';

export const mount = () => ({
  type: MOUNT,
  payload: {
    time: new Date()
  }
});

export const testGetDataAsync = (data) => {
  return makeRequest({
    type: TEST_GET_DATA_ASYNC,
    url: `/${data}`,
  });
};