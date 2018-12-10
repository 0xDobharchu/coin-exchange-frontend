import React from 'react';
import LabelLang from 'src/lang/components/LabelLang';
import { MIN_AMOUNT } from 'src/resources/constants/crypto';

export default (values = {}) => {
  const { amount, fiatAmount, currency } = values;
  if (!amount || !fiatAmount) {
    return <LabelLang id="app.common.required" />;
  }
  if (MIN_AMOUNT[currency] && amount < MIN_AMOUNT[currency]) {
    return <LabelLang id="coin.components.exchange.minAmount" values={{ currency, amount: MIN_AMOUNT[currency]}} />;
  }
  return undefined;
};
