import $http from 'src/utils/http';
import IpInfo from 'src/models/IpInfo';
import { APP } from 'src/resources/constants/app';
import SystemConfigModel from 'src/models/system';
import { API_URL } from 'src/resources/constants/url';
import { DEFAULT_COUNTRY } from 'src/resources/constants/countries';
import local from 'src/services/localStore';
import makeRequest from 'src/redux/action';
import APP_ACTION from './type';

export const updateModal = payload => ({ type: APP_ACTION.UPDATE_MODAL, payload });

// Alert
export const showAlert = config => ({ type: APP_ACTION.UPDATE_APP_STATE, payload: { configAlert: { isShow: true, ...config } } });
export const hideAlert = config => ({ type: APP_ACTION.UPDATE_APP_STATE, payload: { configAlert: { isShow: false, ...config } } });

// confirm passcode:
export const newPasscode = config => ({ type: APP_ACTION.SHOW_CONFIRM, payload: { isShow: true, type: 1, ...config } });
export const requestWalletPasscode = config => ({ type: APP_ACTION.SHOW_CONFIRM, payload: { isShow: true, type: 2, ...config } });
export const updatePasscode = config => ({ type: APP_ACTION.HIDE_CONFIRM, payload: { isShow: true, type: 3, ...config } });
export const hidePasscode = config => ({ type: APP_ACTION.HIDE_CONFIRM, payload: { isShow: false, type: 4, ...config } });
// qrcode content
export const showQRCodeContent = config => ({ type: APP_ACTION.SHOW_QRCODE_CONTENT, payload: { isShow: true, ...config } });
export const hideQRCodeContent = config => ({ type: APP_ACTION.HIDE_QRCODE_CONTENT, payload: { isShow: false, ...config } });

// show require password
export const showRequirePassword = config => ({ type: APP_ACTION.SHOW_REQUIRE_PASSWORD, payload: { isShow: true, ...config } });
export const hideRequirePassword = config => ({ type: APP_ACTION.HIDE_REQUIRE_PASSWORD, payload: { isShow: false, ...config } });

// Loading
export const showLoading = config => ({ type: APP_ACTION.LOADING, payload: { ...config } });
export const hideLoading = () => ({ type: APP_ACTION.LOADED });

// Header
export const hideHeader = () => ({ type: APP_ACTION.HEADER_HIDE });

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


// App
// |-- language
export const setLanguage = (data, autoDetect = true) => ({
  type: APP_ACTION.SET_LANGUAGE,
  payload: data,
  autoDetect,
});
// |-- loading
export const setRootLoading = rootLoading => ({ type: APP_ACTION.UPDATE_APP_STATE, payload: { rootLoading } });


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

};

export const initApp = (language, ref) => (dispatch) => {
  try {
    $http({
      url: 'https://ipfind.co/me',
      params : { auth: APP_ENV.ipfindKey },
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

// QR Code
export const openQrScanner = () => (dispatch) => {
  dispatch({
    type: APP_ACTION.SHOW_SCAN_QRCODE
  });
};

export const closeQrScanner = () => (dispatch) => {
  dispatch({
    type: APP_ACTION.HIDE_SCAN_QRCODE
  });
};

export const getCountryCurrency = (countryCode) => (dispatch, getState) => {
  const supportedCountry = getState()?.app?.supportedCountry || [];
  const country = supportedCountry.find(c => c.country === countryCode) ? countryCode : DEFAULT_COUNTRY;

  const req = makeRequest({
    url: `${API_URL.SYSTEM.GET_COUNTRY_CURRENCY}?country=${country}`,
    type: APP_ACTION.GET_COUNTRY_CURRENCY,
    more: { country },
    withAuth: false,
  }, dispatch);
  return req();
};

export const getSupportCountry = () => (dispatch) => {
  const req = makeRequest({
    url: API_URL.SYSTEM.COUNTRY,
    type: APP_ACTION.GET_SUPPORT_COUNTRY,
    withAuth: false,
  }, dispatch);
  return req().then(res => SystemConfigModel.supportCountryRes(res));
};

export const getSupportLanguages = () => (dispatch) => {
  const req = makeRequest({
    url: API_URL.SYSTEM.GET_LANGUAGES,
    type: APP_ACTION.GET_SUPPORT_LANGUAGES,
    withAuth: false,
  }, dispatch);
  return req();
};
