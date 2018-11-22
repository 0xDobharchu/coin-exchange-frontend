export const APP = {
  HEADER_DEFAULT: 'Handshake',
  // store
  VERSION: 'app_version',
  LOCALE: 'app_locale',
  AUTH_TOKEN: 'auth_token',
  AUTH_PROFILE: 'auth_profile',
  WALLET_MASTER: 'wallet_master',
  WALLET_CACHE: 'wallet_cache',
  WALLET_DEFAULT: 'wallet_default',
  WALLET_LIST: 'wallet_list',
  IP_INFO: 'ip_info',
  EMAIL_NEED_VERIFY: 'email_need_verify',
  PHONE_NEED_VERIFY: 'phone_need_verify',
  COUNTRY_PHONE_NEED_VERIFY: 'country_phone_need_verify',
  CHAT_ENCRYPTION_KEYPAIR: 'chat_encryption_keypair',
  REFERS: 'refers',
  SETTING: 'setting',
  OFFLINE_STATUS: 'offline_status',
  ALLOW_LOCATION_ACCESS: 'allow_location_access',
  isSupportedLanguages: ['en', 'zh', 'fr', 'de', 'ja', 'ko', 'ru', 'es', 'vi'],
  CC_SOURCE: 'cc_source',
  CC_PRICE: 'cc_price',
  CC_ADDRESS: 'cc_address',
  CC_TOKEN: 'cc_token',
  CC_EMAIL: 'cc_email',
  EXCHANGE_ACTION: 'exchange_action',
  EXCHANGE_CURRENCY: 'exchange_currency',
};

export const BASE_API = {
  BASE_URL: process.env.BASE_API_URL,
  TIMEOUT: 10000,
};

export const URL = {
  INDEX: '/',
  CC_PAYMENT_URL: '/cc-payment',
  BUY_BY_CC_URL: '/buy-by-credit-card',
  BUY_COIN_URL: '/coin',
  CRYPTO_COIN_URL: '/coin',
  FAQ_URL: '/coin/faq',
  SELL_COIN_URL: '/sell-coin',

  HANDSHAKE_ME: '/me',
  HANDSHAKE_ME_INDEX: '/me',
  HANDSHAKE_ME_PROFILE: '/me/profile',
  HANDSHAKE_ME_VERIRY_EMAIL: '/me/verify/email',
  WALLET: '/wallet',
};
