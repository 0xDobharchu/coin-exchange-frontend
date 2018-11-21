/* eslint react/prop-types:0 */
import React from 'react';
import Exchange from '../../components/exchange';

const field = ({ input, meta, currency, fiatCurrency, orderType, direction }) => {
  const {
    onChange, onFocus, onBlur
  } = input;
  const { error, touched } = meta;
  const shouldShowError = !!(touched && error);
  return (
    <div>
      <Exchange
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        currency={currency}
        fiatCurrency={fiatCurrency}
        orderType={orderType}
        direction={direction}
        markRequired={shouldShowError}
      />
      { shouldShowError && <span className="text-danger">{error}</span>}
    </div>
  );
};

export default field;
export exchangeValidator from './validator';
