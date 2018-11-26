import React from 'react';
import MyMessage from 'src/lang/components/MyMessage';

export default (values = {}) => {
  const { address, currency } = values;
  if (!address || !currency) {
    return <MyMessage id="app.common.required" />;
  }
  return undefined;
};