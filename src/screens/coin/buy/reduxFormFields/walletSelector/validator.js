import React from 'react';
import LabelLang from 'src/lang/components/LabelLang';

export default (values = {}) => {
  const { address, currency, invalidAddress } = values;
  if (!address || !currency) {
    return <LabelLang id="app.common.required" />;
  }
  if (invalidAddress) {
    return <LabelLang id="coin.components.walletSelector.invalidAddressMsg" />;
  }
  return undefined;
};
