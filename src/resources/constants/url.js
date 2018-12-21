export const API_BASE = APP_ENV.BASE_API_URL;
export const URL = {
  FAQ_URL: '/faq',
  AGREEMENT: '/agreement-privacy',
  USER_SIGN_IN: '/sign-in',
  USER_SIGN_UP: '/sign-up',
  USER_FORGET_PASSWORD: '/forget-password',
  USER_FORGET_PASSWORD_FINISH: '/forget-finish',
  HOME: '/',
  ABOUT_US: '/about-us',
  TEAM: '/team',
  COIN: '/coin',
  CONTACT: '/contact-us',
  WALLET: '/wallet',
  ME: '/me',
  ME_PROFILE: '/me/profile',
  ME_SETTING: '/me/setting',
  ME_ACCOUNT_LEVEL: '/me/accountLevel',
  ME_HISTORY: '/me/history',
  ME_BANK_INFO: '/me/bankInfo',
  ME_REFERRAL: '/me/referral',
  PROMOTION_PROGRAM: '/promotion-programs',
  HOW_IT_WORKS: '/static/how-it-works',
  REFERRAL: '/referral',
  IP_DOMAIN: 'https://ipfind.co/me',
  STATIC_PAGE: '/static/:id',
};

export const API_URL = {
  EXCHANGE: {
    GET_FIAT_CURRENCY: 'exchange/quote',
    REVIEWS: 'exchange/reviews/',
    GET_SUPPORT_CURRENCY: 'exchange/currencies/'
  },
  USER: {
    USER_SIGN_IN: '/token/', // POST /user/token
    USER_TOKEN_REFRESH: '/token/refresh/', // POST /user/token
    USER_SIGN_UP: '/user/sign-up/', // POST /user/sign-up
    USER_WALLET: '/user/wallet/', // POST,GET /user/wallet
    USER_PROFILE: '/user/profile/', // GET /user/profile
    USER_FORGET_PASSWORD: '/user/forgot-password/', // POST user/forgot-password/
    USER_FORGET_PASSWORD_FINISH: '/user/reset-password/', // POST user/forgot-password/reset/
    USER_VERYFY_PASSWORD: '/user/verify-password/',
    USER_LOG: '/user/logs/'
  },
  SYSTEM: {
    COUNTRY : '/system/country-default-configs/?time=3423434', // GET /system/country-default-configs/
    GET_COUNTRY_CURRENCY: '/system/country-currencies/', // GET /system/country-currencies/?country=
    GET_BANK_INFO: '/system/banks/', // GET system/banks/?currency=&country=
    SUBMIT_CONTACT: '/system/contacts/',
    GET_LANGUAGES: '/system/languages/',
    GET_POPULAR_PLACE_BY_COUNTRY: '/system/popular-places/', // GET system/popular-places/?country=HK&language=zh-Hant-HK
    GET_POPULAR_BANK_BY_COUNTRY: '/system/popular-banks/', // GET system/popular-places/?country=HK&language=zh-Hant-HK
  },
  LANDING: {
    STATIC_PAGE: '/content/static-page/',
    FAQ: '/content/faq/',
  },
  COIN: {
    // GET /exchange/quote/?amount=&currency=&fiat_currency=&check=[1,0]&user_check=[1,0]&direction=[buy,sell]
    GET_QUOTE: '/exchange/quote/',
    // `GET /exchange/quote-reverse/?fiat_amount=&currency=&fiat_currency=&check=[1,0]&user_check=[1,0]&direction=[buy,sell]&order_type=[cod,bank]`
    GET_QUOTE_REVERSE: '/exchange/quote-reverse/',
    // POST /exchange/orders/
    MAKE_ORDER: '/exchange/orders/',
    // POST /exchange/addresses/?currency=
    GEN_ADDRESS: '/exchange/addresses/',
    // PUT /exchange/orders/{order_id}/receipt/
    ADD_RECEIPT_ORDER: '/exchange/orders/{order_id}/receipt/',
    // GET /exchange/deposited-address/?address=&currency=
    CHECK_ADDRESS: '/exchange/deposited-address/',
  },
  ME: {
    PROFILE: '/user/profile/',
    VERIFY_EMAIL: '/user/verify-email/',
    CHANGE_PASSWORD: '/user/change-password/',
    EXCHANGE_ORDERS: '/exchange/orders/',
    VERIFY_PHONE: '/user/verify-phone/',
    VERIFY_IDCARD: '/user/verify-id/',
    VERIFY_SELFIE: '/user/verify-selfie/',
    TWO_FACTOR: '/user/two-fa/',
    REFERRALS: '/user/referrals/',
    FILE_UPLOAD: '/user/file-upload/',
    CURRENCY_LEVEL_LIMIT: '/system/currency-level-limits/',
    REFERRALS_EARNING_PROMOTION: '/exchange/promotions/',
    REFERRALS_EARNING_REFERRALS: '/exchange/referrals/',
    API_TOKEN: '/user/api-token/',
  }
};

export const LANDING_PAGE_TYPE = {
  landing: {
    text: '',
    url: '',
  },
};
