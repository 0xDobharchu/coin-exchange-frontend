export const CRYPTO_CURRENCY = {
  ETH: 'ETH',
  BTC: 'BTC',
};

export const CRYPTO_CURRENCY_NAME = {
  [CRYPTO_CURRENCY.ETH]: 'ETH',
  [CRYPTO_CURRENCY.BTC]: 'BTC',
};

export const CRYPTO_CURRENCY_FULLNAME = {
  [CRYPTO_CURRENCY.ETH]: 'Ethereum',
  [CRYPTO_CURRENCY.BTC]: 'Bitcoin',
};

export const CRYPTO_CURRENCY_LIST = Object.values(CRYPTO_CURRENCY).map(item => ({ value: item, text: CRYPTO_CURRENCY_NAME[item] }));

export const MIN_AMOUNT = {
  [CRYPTO_CURRENCY.ETH]: 0.01,
  [CRYPTO_CURRENCY.BTC]: 0.001,
};
