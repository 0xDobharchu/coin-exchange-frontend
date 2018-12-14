/* eslint react/prop-types:0 */
import React from 'react';
import PopularPlacesField from 'src/components/popularBank/popularPlacesField';

const field = ({ input, meta, className = '', containerClassname,  placeholder, ...restProps }) => {
  const {
    onChange, onBlur, onFocus, value
  } = input;
  const { error, touched } = meta;
  const shouldShowError = !!(touched && error);
  return (
    <div className={containerClassname}>
      <PopularPlacesField
        className={className}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        value={value}
        {...restProps}
      />
      { shouldShowError && <small className="text-danger">{error}</small>}
    </div>
  );
};

export default field;
export popularBanksValidator from './validator';