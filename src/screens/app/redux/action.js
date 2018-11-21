import $http from 'src/services/api';
import IpInfo from 'src/models/IpInfo';
import { APP } from 'src/constants';
import local from 'src/services/localStore';
import APP_ACTION from './type';
// import { signUp } from './api';

// Modal
export const showModal = modalContent => ({ type: APP_ACTION.MODAL, modalContent });
export const hideModal = () => ({ type: APP_ACTION.CLOSE_MODAL });
export const updateModal = payload => ({ type: APP_ACTION.UPDATE_MODAL, payload });

// Alert
export const showAlert = config => ({ type: APP_ACTION.UPDATE_APP_STATE, payload: { configAlert: { isShow: true, ...config } } });
export const hideAlert = config => ({ type: APP_ACTION.UPDATE_APP_STATE, payload: { configAlert: { isShow: false, ...config } } });

// Header
export const setHeaderTitle = title => ({ type: APP_ACTION.HEADER_TITLE_SET, payload: title });
export const setHeaderCanBack = () => ({ type: APP_ACTION.HEADER_BACK_SET });
export const clickHeaderBack = () => ({ type: APP_ACTION.HEADER_BACK_CLICK });
export const clearHeaderBack = () => ({ type: APP_ACTION.HEADER_BACK_CLICK });
export const setHeaderRight = data => ({ type: APP_ACTION.HEADER_RIGHT_SET, payload: data });
export const clearHeaderRight = () => ({ type: APP_ACTION.HEADER_RIGHT_REMOVE });
export const setHeaderLeft = data => ({ type: APP_ACTION.HEADER_LEFT_SET, payload: data });
export const clearHeaderLeft = () => ({ type: APP_ACTION.HEADER_LEFT_REMOVE });
export const hideHeader = () => ({ type: APP_ACTION.HEADER_HIDE });
export const showHeader = () => ({ type: APP_ACTION.HEADER_SHOW });

// Not Found
export const setNotFound = () => ({ type: APP_ACTION.NOT_FOUND_SET });
export const clearNotFound = () => ({ type: APP_ACTION.NOT_FOUND_REMOVE });

// IP
export const setIpInfo = (ipInfo) => {
  console.log('Going to set Ip Info', ipInfo);
  local.save(APP.IP_INFO, ipInfo);
  const isBannedIp = ['US'].indexOf(ipInfo.country) >= 0;
  const payload = {
    ipInfo,
    isBannedIp
  };
  return {
    type: APP_ACTION.UPDATE_APP_STATE,
    payload
  };
};


export const scrollToBottom = () => {
  window.scrollTo(0, document.body.scrollHeight);
};

export const setBannedCash = () => ({ type: APP_ACTION.BAN_CASH });
export const setBannedPrediction = () => ({ type: APP_ACTION.BAN_PREDICTION });
export const setCheckBanned = () => ({ type: APP_ACTION.BAN_CHECKED });

// Chat
export const setFirebaseUser = payload => ({ type: APP_ACTION.SET_FIREBASE_USER, payload });

// App
// |-- language
export const setLanguage = (data, autoDetect = true) => ({
  type: APP_ACTION.SET_LANGUAGE,
  payload: data,
  autoDetect,
});
// |-- loading
export const setRootLoading = rootLoading => ({ type: APP_ACTION.UPDATE_APP_STATE, payload: { rootLoading } });

// const authentication = async ({ ref, dispatch, ipInfo }) => {
//   console.log('authentication', ref, dispatch, ipInfo);
//   const token = local.get(APP.AUTH_TOKEN);
//   if (token) {
//     console.log('handle if token is existed');
//   } else {
//     console.log('sign up new user');
//     const result = await signUp();
//     console.log('results is', result);
//   }
// };

const continueAfterInitApp = (language, ref, dispatch, data) => {
  const ipInfoRes = { language: 'en', bannedPrediction: false, bannedCash: false };
  const languageSaved = local.get(APP.LOCALE);

  if (!languageSaved) {
    ipInfoRes.language = data.languages?.[0] || 'en';
  } else {
    ipInfoRes.language = languageSaved;
  }

  const completedLanguage = language || ipInfoRes.language;
  console.log('completed language', completedLanguage);
  if (APP.isSupportedLanguages.indexOf(completedLanguage) >= 0) {
    console.log('set lang', completedLanguage);
    dispatch(setLanguage(completedLanguage, !language));
  }
  dispatch(setRootLoading(false));
  // authentication();
  // if (process.env.isProduction) {
  //   // should use country code: .country ISO 3166-1 alpha-2
  //   // https://ipapi.co/api/#complete-location
  //   if (COUNTRIES_BLACKLIST_PREDICTION.indexOf(data.country_name) !== -1) {
  //     ipInfoRes.bannedPrediction = true;
  //     dispatch(setBannedPrediction());
  //   }
  //   if (COUNTRIES_BLACKLIST_CASH.indexOf(data.country_name) !== -1) {
  //     ipInfoRes.bannedCash = true;
  //     dispatch(setBannedCash());
  //   }
  // }

  // auth({ ref, dispatch })
  //   .then(() => {
  //     dispatch(setRootLoading(false));
  //   })
  //   .catch(() => {
  //     // TO-DO: handle error
  //     dispatch(setRootLoading(false));
  //   });
};

export const initApp = (language, ref) => (dispatch) => {
  try {
    console.log('lfaksjdflakjsdflka=============', APP_ENV.ipfindKey);
    $http({
      url: 'https://ipfind.co/me',
      qs: { auth: APP_ENV.ipfindKey },
      headers: { 'Content-Type': 'text/plain' },
    }).then((res) => {
      const { data } = res;
      const ipInfo = IpInfo.ipFind(data);

      dispatch(setIpInfo(ipInfo));
      continueAfterInitApp(language, ref, dispatch, data);
    }).catch((e) => {
      console.log('App Action InitApp', e);
      // TO-DO: handle error
      dispatch(setRootLoading(false));
      // continueAfterInitApp(language, ref, dispatch, {});
    });
  } catch (e) {
    console.log(e);
  }
};
