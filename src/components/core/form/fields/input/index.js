/* eslint react/prop-types:0 */
import React from 'react';

const inputField = ({ input, meta, ...props }) => {
  const {
    onChange, onBlur, onFocus, value
  } = input;
  const { error, touched } = meta;
  const shouldShowError = !!(touched && error);
  return (
    <div>
      <input
        {...props}
        value={value}
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={onChange}
      />
      { shouldShowError && <span>{error}</span>}
    </div>
  );
};

export default inputField;
export inputValidator from './validator';
