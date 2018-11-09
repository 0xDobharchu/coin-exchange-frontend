import { BigNumber } from 'bignumber.js';

const PRICE_DECIMAL = 3;
export function formatMoney(price = 0) {
  return new BigNumber(price).toFormat(PRICE_DECIMAL);
}

export function formatMoneyByLocale(price = 0, locale = 'USD', decimalNumber = 0) {
  // console.log('coins - price', price);
  switch (locale.toLowerCase()) {
    case 'vnd':
      return new BigNumber(price).dividedBy(1000).decimalPlaces(0).times(1000)
        .toFormat(PRICE_DECIMAL);
    default:
      return new BigNumber(price).toFormat(decimalNumber);
  }
}

export function roundNumberByLocale(price = 0, locale = 'USD', decimalNumber = 0) {
  switch (locale.toLowerCase()) {
    case 'vnd':
      return new BigNumber(price).dividedBy(1000).decimalPlaces(0).times(1000)
        .toNumber();
    default:
      return new BigNumber(price).decimalPlaces(decimalNumber);
  }
}
