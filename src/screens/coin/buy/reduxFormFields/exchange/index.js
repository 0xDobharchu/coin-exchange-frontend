/* eslint react/prop-types:0 */
import React from 'react';
import Exchange from '../../components/exchange';

const field = ({ input, meta, currency, fiatCurrency, orderType, direction }) => {
  const {
    onChange
  } = input;
  const { error, touched } = meta;
  const shouldShowError = !!(touched && error);
  return (
    <div>
      <Exchange
        onChange={onChange}
        currency={currency}
        fiatCurrency={fiatCurrency}
        orderType={orderType}
        direction={direction}
      />
      { shouldShowError && <span>{error}</span>}
    </div>
  );
};

export default field;
