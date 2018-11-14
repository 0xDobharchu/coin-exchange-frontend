/* eslint react/prop-types:0 */
import React from 'react';

const textareaField = ({ input, meta, ...props }) => {
  const {
    onChange, onBlur, onFocus, value
  } = input;
  const { error, touched } = meta;
  const shouldShowError = !!(touched && error);
  return (
    <div>
      <textarea
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

export default textareaField;
export textareaValidator from './validator';
