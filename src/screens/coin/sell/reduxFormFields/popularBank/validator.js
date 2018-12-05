import React from 'react';
import LabelLang from 'src/lang/components/LabelLang';

export default (values = {}) => {
  const { value, isValid } = values;
  if (!value) {
    return <LabelLang id="app.common.required" />;
  }
  if (!isValid) {
    return <LabelLang id="coin.components.popularBanks.invalidBank" />;
  }
  return undefined;
};
