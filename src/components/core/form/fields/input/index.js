/* eslint react/prop-types:0 */
import React from 'react';
import {LabelLang} from 'src/lang/components';
import cx from 'classnames';

const inputField = ({ input, meta, containerClassName, labelClassName, labelText, ...props }) => {
  const {
    onChange, onBlur, onFocus, value
  } = input;
  const { error, touched } = meta;
  const shouldShowError = !!(touched && error);

  return (
    <div className={containerClassName ? containerClassName : ''}>
      {labelText && (<label className={labelClassName ||  ''}>{ <LabelLang id={labelText} /> }</label>)}
      <input
        {...props}
        value={value}
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={onChange}
        className={cx(props.className, shouldShowError ? 'is-invalid' : '')}
      />
      { shouldShowError && <small className="text-danger">{error}</small>}
    </div>
  );
};

export default inputField;
export inputValidator from './validator';
