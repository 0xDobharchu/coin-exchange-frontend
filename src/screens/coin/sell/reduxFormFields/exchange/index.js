/* eslint react/prop-types:0 */
import React from 'react';
import Exchange from '../../components/exchange';

const field = ({ input, meta, currency, fiatCurrency, orderType, direction, className = '' }) => {
  const {
    onChange, onFocus, onBlur
  } = input;
  const { error, touched } = meta;
  const shouldShowError = !!(touched && error);
  return (
    <div className={className}>
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
      { shouldShowError && <small className="text-danger">{error}</small>}
    </div>
  );
};

export default field;
export exchangeValidator from './validator';