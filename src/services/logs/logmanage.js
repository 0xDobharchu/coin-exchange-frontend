import { API_URL } from 'src/resources/constants/url';
import http from 'src/utils/http';
import currentUser from 'src/utils/authentication';
import moment from 'moment';

export default class LogManager {

  static PAGE_EVENT = {
    wallet: {
      transfer: {
        name: 'transfer',
        event: {
          maxValueClick: 'maxValueClick',
          changeFeeClick: 'changeFeeClick',
          fromContactClick: 'fromContactClick',
          qrCodeScanClick: 'qrCodeScanClick',
          fromWalletClick: 'fromWalletClick',
          transferButtonSubmitClick: 'transferButtonSubmitClick',
          transferButtonConfirmClick: 'transferButtonConfirmClick',
          transferButtonCancelClick: 'transferButtonCancelClick',
          transferSuccess: 'transferSuccess',
          transferFail: 'transferFail',
        }
      }
    }
  }

  static saveLog(name = '', action = '', description = '') {

    const local_time = moment().valueOf();
    const path = __CLIENT__ ? window.URL : '';
    const status = 1;

    const data = {
      action, name, description, path, local_time, status
    };

    try {
      const options = {
        url: API_URL.USER.USER_LOG,
        method: 'POST',
        data
      };
      if (currentUser.isLogin()) {
        options.headers = { Authorization: 'Bearer ' + currentUser.getToken() };
      }
      http(options);
      console.log('saved log: ', data);
    } catch (err) {
      console.log('ERROR save log', err);
      return null;
    }
  }
}
