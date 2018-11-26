import React from 'react';
import MyMessage from 'src/lang/components/MyMessage';

export default (values = {}) => {
  const { amount, fiatAmount } = values;
  if (!amount || !fiatAmount) {
    return <MyMessage id="app.common.required" />;
  }
  return undefined;
};