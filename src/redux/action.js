import http from 'src/utils/http';

const DISPATCH_TYPE = {
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
  CALLING: 'CALLING'
};

const makeAction = ({ type, data, dispatchType }) => {
  const _type = dispatchType ? `${type}_${dispatchType}` : type;
  return {
    type: _type,
    data
  };
};

export const makeRequest = (config = {}) => {
  const {
    type, url, method, data, onSuccess, onError, params
  } = config;
  const METHOD = method ? String(method).toLowerCase() : 'get';
  return async (dispatch) => {
    dispatch(makeAction({ type, dispatchType: DISPATCH_TYPE.CALLING, data: { payload: data, url, method: METHOD } }));
    try {
      const res = await http({
        url,
        method: METHOD,
        data,
        params
      });
      if (res) {
        dispatch(makeAction({ type, data: res, dispatchType: DISPATCH_TYPE.SUCCESS }));
        if (typeof onSuccess === 'function') {
          console.warn('Should use Promise instead of callback!');
          onSuccess(res);
        }
      }
      return Promise.resolve(res);
    } catch (e) {
      dispatch(makeAction({ type, data: e, dispatchType: DISPATCH_TYPE.ERROR }));
      if (typeof onError === 'function') {
        console.warn('Should use Promise instead of callback!');
        onError(e);
      }
      return Promise.reject(e);
    }
  };
};

export default makeRequest;
