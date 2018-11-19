/* eslint react/prop-types:0 */
import React from 'react';
import WalletSelector from '../../components/walletSelector';

const field = ({ input, meta }) => {
  const {
    onChange, onBlur, onFocus, value
  } = input;
  const { error, touched } = meta;
  const shouldShowError = !!(touched && error);
  return (
    <div>
      <WalletSelector value={value} onChange={onChange} onBlur={onBlur} onFocus={onFocus} />
      { shouldShowError && <span>{error}</span>}
    </div>
  );
};

export default field;
