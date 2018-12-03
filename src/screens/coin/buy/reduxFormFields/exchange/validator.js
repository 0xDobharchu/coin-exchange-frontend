import React from 'react';
import LabelLang from 'src/lang/components/LabelLang';

export default (values = {}) => {
  const { amount, fiatAmount } = values;
  if (!amount || !fiatAmount) {
    return <LabelLang id="app.common.required" />;
  }
  return undefined;
};
