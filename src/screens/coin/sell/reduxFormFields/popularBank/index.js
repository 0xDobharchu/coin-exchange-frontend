/* eslint react/prop-types:0 */
import React from 'react';
import PopularBanks from '../../components/popularBank';

const field = ({ input, meta, className = '', containerClassname,  placeholder }) => {
  const {
    onChange, onBlur, onFocus
  } = input;
  const { error, touched } = meta;
  const shouldShowError = !!(touched && error);
  return (
    <div className={containerClassname}>
      <PopularBanks
        className={className}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
      />
      { shouldShowError && <small className="text-danger">{error}</small>}
    </div>
  );
};

export default field;
export popularBanksValidator from './validator';