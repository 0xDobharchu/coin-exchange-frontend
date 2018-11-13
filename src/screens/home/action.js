import { makeRequest } from 'src/redux/action';
import { MOUNT, TEST_GET_DATA_ASYNC } from './type';

export const mount = () => ({
  type: MOUNT,
  payload: {
    time: new Date()
  }
});

export const testGetDataAsyncWithDispatch = data => (dispatch) => {
  const req = makeRequest({
    type: TEST_GET_DATA_ASYNC,
    url: `/${data}`,
  }, dispatch);
  return req().then((res) => {
    console.log('testGetDataAsyncWithDispatch', res); return res;
  });
};

export const testGetDataAsyncShorthand = data => makeRequest({
  type: TEST_GET_DATA_ASYNC,
  url: `/${data}`,
});
