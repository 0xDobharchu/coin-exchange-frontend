// import { APP } from 'src/constants';
import SystemConfigModel from 'src/models/system';
import { FAIL_DEFAULT_LANGUAGE } from 'src/resources/constants/languages';
import local from 'src/services/localStore';
import { APP } from 'src/resources/constants/app';
import APP_TYPE from './type';

const {
  HEADER_TITLE_SET,
  HEADER_RIGHT_REMOVE,
  HEADER_LEFT_REMOVE,
  HEADER_HIDE,
  HEADER_DEFAULT,
  UPDATE_APP_STATE,
  SET_LANGUAGE,
  HIDE_CONFIRM,
  SHOW_CONFIRM,
  SHOW_SCAN_QRCODE,
  HIDE_SCAN_QRCODE,
  GET_SUPPORT_COUNTRY,
  GET_COUNTRY_CURRENCY,
  SHOW_QRCODE_CONTENT,
  HIDE_QRCODE_CONTENT,
  SHOW_REQUIRE_PASSWORD,
  HIDE_REQUIRE_PASSWORD,
  GET_SUPPORT_LANGUAGES
} = APP_TYPE;

const initState = {
  version: '0.0.2', // local.get(APP.VERSION),

  rootLoading: true,

  locale: FAIL_DEFAULT_LANGUAGE, // local.get(APP.LOCALE) || 'en',

  isCalling: false,
  isLoading: false,

  isModal: false,
  isModalContent: null,

  isAlert: false,
  isAlertContent: null,
  configAlert: {
    isShow: false,
    message: '',
  },

  isError: false,
  isWarning: false,

  overlay: false,

  isNotFound: false,

  headerTitle: HEADER_DEFAULT,
  headerBack: false,
  headerRightContent: null,
  headerLeftContent: null,
  showHeader: false,

  ipInfo: local.get(APP.IP_INFO) || {},

  isBannedCash: false,
  isBannedPrediction: false,
  isBannedChecked: false,
  isBannedIp: false,

  isNerworkError: false,

  modal: {
    className: '',
    show: false,
    body: null,
    title: null,
    centered: false,
  },
  openQrScanner: false,
  supportedCountry: [],
  supportedCurrency: [],
  userCountry: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case SHOW_CONFIRM:
      return {
        ...state,
        passcodeData: action.payload,
      };
    case HIDE_CONFIRM:
      return {
        ...state,
        passcodeData: action.payload,
      };
    case SHOW_QRCODE_CONTENT:
      return {
        ...state,
        qRCodeContentData: action.payload,
      };
    case HIDE_QRCODE_CONTENT:
      return {
        ...state,
        qRCodeContentData: action.payload,
      };
    case SHOW_REQUIRE_PASSWORD:
      return {
        ...state,
        passwordData: action.payload,
      };
    case HIDE_REQUIRE_PASSWORD:
      return {
        ...state,
        passwordData: action.payload,
      };
    case HEADER_TITLE_SET:
      return {
        ...state,
        headerTitle: action.payload,
      };
    case HEADER_RIGHT_REMOVE:
      return {
        ...state,
        headerRightContent: null,
      };
    case HEADER_LEFT_REMOVE:
      return {
        ...state,
        headerLeftContent: null,
      };
    case HEADER_HIDE:
      return {
        ...state,
        showHeader: false,
      };
    case UPDATE_APP_STATE:
      return {
        ...state,
        ...action.payload
      };
    case SET_LANGUAGE: {
      // if (!action.autoDetect) {
      //   if(__CLIENT__) {
      //     local.save(APP.LOCALE, action.payload);
      //   }
      // }
      return {
        ...state,
        locale: action.payload,
      };
    }
    case SHOW_SCAN_QRCODE:
      return {
        ...state,
        openQrScanner: true
      };
    case HIDE_SCAN_QRCODE:
      return {
        ...state,
        openQrScanner: false
      };
    case `${GET_SUPPORT_COUNTRY}_SUCCESS`:
      return {
        ...state,
        supportedCountry: action?.data?.map((d) => SystemConfigModel.supportCountryRes(d)) || []
      };
    case `${GET_COUNTRY_CURRENCY}_SUCCESS`:
      return {
        ...state,
        supportedCurrency: action?.data?.map(c => c?.currency) || [],
        userCountry: action?.more?.country
      };
    case `${GET_SUPPORT_LANGUAGES}_SUCCESS`:
      return {
        ...state,
        supportedLanguages: action?.data || {}
      };
    default:
      return state;
  }
};
