/* eslint react/prop-types:0 */
import React from 'react';
import { LabelLang } from 'src/lang/components';
import Input from 'src/components/core/controls/input';
import cx from 'classnames';

const inputField = ({ input, meta, containerClassName, labelClassName, labelText, inputName, className, ...props }) => {
  const {
    onChange, onBlur, onFocus, value, name
  } = input;
  const { error, touched } = meta;
  const shouldShowError = !!(touched && error);
  return (
    <div className={containerClassName ? containerClassName : ''}>
      {labelText && (<label className={labelClassName ||  ''}>{ <LabelLang id={labelText} /> }</label>)}
      <Input
        {...props}
        name={name || inputName}
        value={value}
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={onChange}
        className={cx(className, shouldShowError ? 'border-danger' : '')}
      />
      { shouldShowError && <small className="text-danger"> <LabelLang id={error} /> </small>}
    </div>
  );
};

export default inputField;
export inputValidator from './validator';
