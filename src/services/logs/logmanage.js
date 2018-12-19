import { API_URL } from 'src/resources/constants/url';
import http from 'src/utils/http';
import currentUser from 'src/utils/authentication';
import moment from 'moment';

export default class LogManager {

  static PAGE_EVENT = {
    wallet: {
      transfer: {
        name: 'transfer-page',
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
      },
      receive: {
        name: 'receive-page',
        event: {
          qrCodeCopyClick: 'qrCodeCopyClick',
          downloadQrCodeClick: 'downloadQrCodeClick',
          addressCopyButtonClick: 'addressCopyButtonClick',
        }
      },
      requirePassword:{
        name: 'requirePassword',
        event: {
          requirePasswordFail: 'requirePasswordFail',
          requirePasswordPass: 'requirePasswordPass',
        }
      },
      walletHomePage: {
        name: 'wallet-home-page',
        event: {
          transferButtonClick: 'transferButtonClick',
          receiveButtonClick: 'transferButtonClick',
          protectedButtonClick: 'protectedButtonClick',
          preferencesButtonClick: 'protectedButtonClick',
          floatButtonClick: 'floatButtonClick',
          newWalletButtonClick: 'newWalletButtonClick',
          sortWalletListIconClick: 'sortWalletListIconClick',
          createWalletSuccess: 'createWalletSuccess',
          showTransferFromScanQRCode: 'showTransferFromScanQRCode',
          exportWalletItemClick: 'exportWalletItemClick',
          exportPrivateKeyItemClick: 'exportPrivateKeyItemClick',          
          removeWalletSuccess: 'removeWalletSuccess',
          newTokenButtonClick: 'newTokenButtonClick',
          newCollectableButtonClick: 'newCollectableButtonClick',
          createTokenSuccess: 'createTokenSuccess',
          createCollectableSuccess: 'createCollectableSuccess',

        }
      },
      protected: {
        name: 'protected-page',
        event: {
          protectedWalletSuccess: 'protectedWalletSuccess',
          protectedWalletFail: 'protectedWalletFail',
          protectedStep1Click: 'protectedStep1Click',
          protectedStep2Click: 'protectedStep2Click',
          protectedStep3Click: 'protectedStep3Click',
          protectedTryStep3Click: 'protectedTryStep3Click',

        }
      }
    }
  }

  static saveLog(name = '', action = '', description = '') {

    const local_time = moment().format('MMM DD, YYYY, h:mm:ss a'); 
    const path = __CLIENT__ ? window.location.href : '';
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
