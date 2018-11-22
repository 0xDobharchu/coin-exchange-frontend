export const API_BASE = APP_ENV.BASE_API_URL;
export const URL = {
  INDEX: '/',
  HANDSHAKE_ME: '/me/',
  HANDSHAKE_ME_INDEX: '/me/',
  HANDSHAKE_ME_PROFILE: '/me/profile/',
  HANDSHAKE_ME_VERIRY_EMAIL: '/me/verify/email/',

  HANDSHAKE_CREATE: '/create/',
  HANDSHAKE_CREATE_INDEX: '/create/',

  HANDSHAKE_EXCHANGE: '/exchange/',
  HANDSHAKE_EXCHANGE_INDEX: '/exchange/',
  BUY_COIN_URL: '/coin/',
  CRYPTO_COIN_URL: '/coin/',
  FAQ_URL: '/faq',
  SELL_COIN_URL: '/sell-coin/',

  USER_SIGN_IN: '/sign-in/',
  USER_SIGN_UP: '/sign-up/',
  USER_FORGET_PASSWORD: '/forget-password/',
  USER_FORGET_PASSWORD_FINISH: '/forget-password/finish/',
  HOME: '/',
  ABOUT_US: '/about-us',
  TEAM: '/team',
  COIN: '/coin',
  CONTACT: '/contact-us',
  WALLET: '/wallet',
  ME: '/me'
};

export const API_URL = {
  EXCHANGE: {
    GET_FIAT_CURRENCY: 'exchange/info/crypto-price',
    GET_CRYPTO_PRICE: 'exchange/info/instant-buy/price', // {path: '/info/instant-buy/price', method: 'get'},
    CREATE_CC_ORDER: 'exchange/instant-buys', // {path: '/instant-buys', method: 'post'},
    GET_USER_CC_LIMIT: 'exchange/user/profile/cc-limit', // {path: '/user/profile/cc-limit', method: 'get'},
    GET_CC_LIMITS: 'exchange/info/cc-limits', // {path: '/info/cc-limits', method: 'get'},
    GET_USER_PROFILE: 'exchange/user/profile', // {path: '/user/profile', method: 'get'},
    GET_OFFER_PRICE: 'exchange/info/crypto-quote', // {path: '/info/instant-buy/price', method: 'get'},
    GET_LIST_OFFER_PRICE: 'exchange/info/crypto-quotes', // {path: '/info/instant-buy/price', method: 'get'},
    GET_LIST_OFFER_PRICE_CASH_ATM: 'exchange/cash/quotes', // {path: '/info/instant-buy/price', method: 'get'},
    GET_USER_TRANSACTION: 'exchange/user/transactions', // {path: '/user/transactions', method: 'get'},
    OFFERS: 'exchange/offers',
    SHAKE: 'shake',
    WITHDRAW: 'withdraw',
    IP_DOMAIN: 'https://ipfind.co/me',

    // Store
    OFFER_STORES: 'exchange/offer-stores',
    SHAKES: 'shakes',
    REVIEWS: 'exchange/reviews',
    GET_DASHBOARD_INFO: 'exchange/user/transaction-counts',
    DEPOSIT_CREDIT_ATM: 'exchange/credit/deposit',
    CREDIT_ATM: 'exchange/credit',
    CREDIT_ATM_TRANSFER: 'exchange/credit/tracking',
    WITHDRAW_CASH_DEPOSIT_ATM: 'exchange/credit/withdraw',
    CASH_ATM: 'exchange/cash',
    CASH_STORE_ATM: 'exchange/cash/store',
    CRYPTO_TO_CASH: 'exchange/cash/price', // GET /cash/price?amount=1&currency=ETH
    SEND_ATM_CASH_TRANSFER: 'exchange/cash/order',
    CANCEL_ATM_CASH_TRANSFER: 'exchange/cash/order', // DELETE /cash/order/{id}
    GET_CASH_CENTER_BANK: 'exchange/cash/center', // GET /cash/center/HK (HK === country code)
    BUY_CRYPTO_ORDER: 'exchange/coin/order', // POST /coin/order
    BUY_CRYPTO_GET_COIN_INFO: 'exchange/coin/quote', // GET /coin/quote?amount=0.1&currency=ETH&fiat_currency=VND
    BUY_CRYPTO_GET_BANK_INFO: 'exchange/coin/center', // GET /coin/center/XX
    BUY_CRYPTO_SAVE_RECEIPT: 'exchange/coin/order', // POST /coin/{id}
    BUY_CRYPTO_QUOTE_REVERSE: 'exchange/coin/quote-reverse', // GET /coin/quote-reverse?fiat_amount=20000000&currency=ETH&fiat_currency=VND&type=cod
    SELL_COIN_GET_COIN_INFO: 'exchange/coin/quote', // GET /coin/quote?amount=0.1&currency=ETH&fiat_currency=VND&direction=sell
    SELL_COIN_ORDER: 'exchange/coin/selling-order', // POST /coin/selling-order
    SELL_COIN_GENERATE_ADDRESS: 'exchange/coin/generate-address', // POST /coin/generate-address?currency=BTC
    SELL_COIN_GET_BANK_LIST: 'exchange/coin/bank', // GET /coin/bank/{country}
  },
  ME: {
    BASE: 'handshake/me',
    SET_OFFLINE_STATUS: 'exchange/user/profile/offline',
  },
  USER: {
    USER_SIGN_IN: '/token/', // POST /user/token
    USER_TOKEN_REFRESH: '/token/refresh/', // POST /user/token
    USER_SIGN_UP: '/user/sign-up/', // POST /user/sign-up
    USER_WALLET: '/user/wallet/', // POST,GET /user/wallet
    USER_PROFILE: '/user/profile/', // GET /user/profile
    USER_FORGET_PASSWORD: '/user/forgot-password/', // POST user/forgot-password/
    USER_FORGET_PASSWORD_FINISH: '/user/forgot-password/reset/', // POST user/forgot-password/reset/
  },
  SYSTEM: {
    COUNTRY : '/system/country-default-configs/', // GET /system/country-default-configs/
    GET_COUNTRY_CURRENCY: '/system/country-currencies/', // GET /system/country-currencies/?country=
    GET_BANK_INFO: '/system/banks/' // GET system/banks/?currency=&country=
  },
  LANDING: {
    FAQ: 'content/faq/',
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
  },
};

export const LANDING_PAGE_TYPE = {
  landing: {
    text: '',
    url: '',
  },
};
