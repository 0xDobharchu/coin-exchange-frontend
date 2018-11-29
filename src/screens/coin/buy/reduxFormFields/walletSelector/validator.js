import React from 'react';
import MyMessage from 'src/lang/components/MyMessage';

export default (values = {}) => {
  const { address, currency, invalidAddress } = values;
  if (!address || !currency) {
    return <MyMessage id="app.common.required" />;
  }
  if (invalidAddress) {
    return <MyMessage id="coin.components.walletSelector.invalidAddressMsg" />;
  }
  return undefined;
};