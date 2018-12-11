import http from 'src/utils/http';
import currentUser from 'src/utils/authentication';
import configureStore from 'src/redux/store';

const store = configureStore();

const DISPATCH_TYPE = {
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
  CALLING: 'CALLING'
};

const makeAction = ({ type, data, more, dispatchType }) => {
  const _type = dispatchType ? `${type}_${dispatchType}` : type;
  return {
    type: _type,
    data,
    more
  };
};

export const makeRequest = (config = {}, _dispatch) => {
  const {
    type, url, method, data, onSuccess, onError, onFinal, params, withAuth = true, more = {}
  } = config;
  const METHOD = method ? String(method).toLowerCase() : 'get';
  return async (d) => {
    let dispatch = d;
    if (typeof d !== 'function') {
      dispatch = _dispatch || store.dispatch;
    }

    if (typeof dispatch !== 'function') {
      throw new Error('Redux makeRequest func required dispatch!');
    }
    dispatch(makeAction({ type, dispatchType: DISPATCH_TYPE.CALLING, more, data: { payload: data, url, method: METHOD } }));
    try {

      const options = {
        url,
        method: METHOD,
        data,
        params
      };
      if(currentUser.isLogin() && withAuth) {
        options.headers = {Authorization: 'Bearer ' + currentUser.getToken() };
      }
      const res = await http(options);
      if (res) {
        dispatch(makeAction({ type, data: res, more, dispatchType: DISPATCH_TYPE.SUCCESS }));
        if (typeof onSuccess === 'function') {
          console.warn('Should use Promise instead of callback!');
          onSuccess(res);
        }
        if (typeof onFinal === 'function') {
          console.warn('Should use Promise instead of callback!');
          onFinal(res);
        }
      }
      return Promise.resolve(res);
    } catch (e) {
      console.log('loi cmnnr', e.message);
      dispatch(makeAction({ type, data: e, more, dispatchType: DISPATCH_TYPE.ERROR }));
      if (typeof onError === 'function') {
        console.warn('Should use Promise instead of callback!');
        onError(e);
      }
      if (typeof onFinal === 'function') {
        console.warn('Should use Promise instead of callback!');
        onFinal(e);
      }
      return Promise.reject(e);
    }
  };
};

export default makeRequest;
