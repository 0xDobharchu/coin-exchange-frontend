/* eslint react/prop-types:0 */
import React from 'react';
import {LabelLang} from 'src/lang/components';

const textareaField = ({ input, meta, containerClassName, labelClassName, labelText, ...props }) => {
  const {
    onChange, onBlur, onFocus, value
  } = input;
  const { error, touched } = meta;
  const shouldShowError = !!(touched && error);
  return (
    <div className={containerClassName ? containerClassName : ''}>
      {labelText && (<label className={labelClassName ||  ''}>{ <LabelLang id={labelText} /> }</label>)}
      <textarea
        {...props}
        value={value}
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={onChange}
      />
      { shouldShowError && <small className="text-danger">{error}</small>}
    </div>
  );
};

export default textareaField;
export textareaValidator from './validator';
