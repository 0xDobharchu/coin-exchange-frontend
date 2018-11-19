/* eslint react/prop-types:0 */
import React from 'react';
import {LabelLang} from 'src/lang/components';

const inputField = ({ input, meta, ...props }) => {
  const {
    onChange, onBlur, onFocus, value
  } = input;
  const { error, touched } = meta;
  const shouldShowError = !!(touched && error);
  return (
    <div className={props.containerClassName ? props.containerClassName : ''}>
      {props.labelText && (<label className={props.labelClassName ||  ''}>{ <LabelLang id={props.labelText} /> }</label>)}
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
