export const CRYPTO_CURRENCY = {
  ETH: 'ETH',
  BTC: 'BTC',
  BCH: 'BCH',
};

export const CRYPTO_CURRENCY_NAME = {
  [CRYPTO_CURRENCY.ETH]: 'ETH',
  [CRYPTO_CURRENCY.BTC]: 'BTC',
  [CRYPTO_CURRENCY.BCH]: 'BCH',
};

export const CRYPTO_CURRENCY_FULLNAME = {
  [CRYPTO_CURRENCY.ETH]: 'Ethereum',
  [CRYPTO_CURRENCY.BTC]: 'Bitcoin',
  [CRYPTO_CURRENCY.BCH]: 'Bitcoin Cash',
};

export const CRYPTO_CURRENCY_LIST = Object.values(CRYPTO_CURRENCY).map(item => ({ value: item, text: CRYPTO_CURRENCY_NAME[item] }));

export const MIN_AMOUNT = {
  [CRYPTO_CURRENCY.ETH]: 0.01,
  [CRYPTO_CURRENCY.BTC]: 0.001,
  [CRYPTO_CURRENCY.BCH]: 0.001,
};
