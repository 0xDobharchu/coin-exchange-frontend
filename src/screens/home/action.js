import { makeRequest } from 'src/redux/action';
import { MOUNT, TEST_GET_DATA_ASYNC } from './type';

export const mount = () => ({
  type: MOUNT,
  payload: {
    time: new Date()
  }
});

export const testGetDataAsync = data => makeRequest({
  type: TEST_GET_DATA_ASYNC,
  url: `/${data}`,
});
