/* eslint react/prop-types:0 */
import React from 'react';
import Exchange from '../../components/exchange';

const field = ({ input, meta }) => {
  const {
    onChange
  } = input;
  const { error, touched } = meta;
  const shouldShowError = !!(touched && error);
  return (
    <div>
      <Exchange onChange={onChange} />
      { shouldShowError && <span>{error}</span>}
    </div>
  );
};

export default field;
