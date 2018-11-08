import http from 'src/utils/http';

const dispatchType = {
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
  CALLING: 'CALLING'
};

const makeAction = ({ type, data, dispatchType }) => {
  const _type = dispatchType ? `${type}-${dispatchType}` : type;
  return {
    type: _type,
    data
  };
};

export const makeRequest = (params = {}) => {
  const { type, url, method, data, onSuccess, onError } = params;
  const METHOD = method ? String(method).toLowerCase() : 'get';
  return async (dispatch) => {
    dispatch(makeAction({ type, dispatchType: dispatchType.CALLING, data: { payload: data, url, method }}));
    try {
      const res = await http[METHOD](url, data);
      if (res) {
        dispatch(makeAction({ type, data: res, dispatchType: dispatchType.SUCCESS}));
        if (typeof onSuccess === 'function') { 
          onSuccess(res);
        }
      }
    } catch(e) {
      dispatch(makeAction({ type, data: e, dispatchType: dispatchType.ERROR}));
      if (typeof onError === 'function') {
        onError(e);
      }
    }
  };
};

export default makeRequest;