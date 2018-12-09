import React from 'react';
import LabelLang from 'src/lang/components/LabelLang';

export default (values = {}) => {
  const { value, isValid, term } = values;
  if (!term) {
    return <LabelLang id="app.common.required" />;
  }
  if (!isValid || !value) {
    return <LabelLang id="coin.components.popularBanks.invalidBank" />;
  }
  return undefined;
};
