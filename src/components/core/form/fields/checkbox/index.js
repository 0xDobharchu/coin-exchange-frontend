/* eslint react/prop-types:0 */
import {LabelLang} from 'src/lang/components';
import cx from 'classnames';
import React from 'react';

const inputField = ({ input, meta, ...props }) => {
  const {
    onChange, onBlur, onFocus, value
  } = input;
  const { error, touched } = meta;
  const shouldShowError = !!(touched && error);
  return (
    <div className={cx('checkboxWarper',props.containerClassName ? props.containerClassName : '')}>
      <label className={props.labelClassName ||  ''}>
        {props.labelText && (<LabelLang id={props.labelText} />) }
        <input
          type="checkbox"
          {...props}
          value={value}
          onBlur={onBlur}
          onFocus={onFocus}
          onChange={onChange}
        />
        <span className="checkmark" />
        { shouldShowError && <span>{error}</span>}
      </label>
    </div>
  );
};

export default inputField;
export inputValidator from './validator';
