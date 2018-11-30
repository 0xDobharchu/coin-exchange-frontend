import configureStore from 'src/redux/store';
import { showAlert } from 'src/screens/app/redux/action';
import getServerErrMessage from './getServerErrMessage';

const store = configureStore();

/**
 * Simple error handler for error responses
 */
export default (e, { message: defaultMsg } = {}) => {
  return new Promise(resolve => {
    if (!e) return resolve();
    const message = getServerErrMessage(e, defaultMsg)?.key;
    store.dispatch(showAlert({
      message,
      type: 'danger',
      timeOut: 3000,
      callBack: resolve
    }));
  });
};