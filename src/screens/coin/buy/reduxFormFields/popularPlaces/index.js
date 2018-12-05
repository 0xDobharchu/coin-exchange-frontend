/* eslint react/prop-types:0 */
import React from 'react';
import PopularPlaces from '../../components/popularPlaces';

const field = ({ input, meta, className = '', placeholder }) => {
  const {
    onChange, onBlur, onFocus
  } = input;
  const { error, touched } = meta;
  const shouldShowError = !!(touched && error);
  return (
    <div>
      <PopularPlaces
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
export popularPlacesValidator from './validator';