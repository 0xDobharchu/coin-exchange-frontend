/* eslint react/prop-types:0 */
import React from 'react';
import PaymentMethod from '../../components/paymentMethod';

const field = ({ input, meta, className = '' }) => {
  const {
    onChange, value
  } = input;
  const { error, touched } = meta;
  const shouldShowError = !!(touched && error);
  return (
    <div className={className}>
      <PaymentMethod onChange={onChange} defaultValue={value} />
      { shouldShowError && <small className="text-danger">{error}</small>}
    </div>
  );
};

export default field;
