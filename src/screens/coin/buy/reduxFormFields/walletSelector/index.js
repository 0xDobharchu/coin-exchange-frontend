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
      <WalletSelector markRequired={shouldShowError} value={value} onChange={onChange} onBlur={onBlur} onFocus={onFocus} />
      { shouldShowError && <span className="text-danger">{error}</span>}
    </div>
  );
};

export default field;
export walletValidator from './validator';