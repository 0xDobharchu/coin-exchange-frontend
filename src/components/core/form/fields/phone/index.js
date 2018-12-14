/* eslint react/prop-types:0 */
import React from 'react';
import { LabelLang } from 'src/lang/components';
import Phone from 'src/components/core/controls/phoneNumber';
import cx from 'classnames';
import styles from './styles.scss';

const phoneField = ({ input, meta, containerClassName, labelClassName, labelText, inputName, className, ...props }) => {
  const {
    onChange, onBlur, onFocus, value
  } = input;
  const { error, touched } = meta;
  const shouldShowError = !!(touched && error);
  return (
    <div className={cx(styles.container ,containerClassName ? containerClassName : '')}>
      {labelText && (<label className={labelClassName ||  ''}>{ <LabelLang id={labelText} /> }</label>)}
      <Phone
        {...props}
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

export default phoneField;
export phoneValidator from './validator';
