/* eslint react/prop-types:0 */
import React from 'react';
import PaymentMethod from '../../components/paymentMethod';

const field = ({ input, meta }) => {
  const {
    onChange, value
  } = input;
  const { error, touched } = meta;
  const shouldShowError = !!(touched && error);
  return (
    <div>
      <PaymentMethod onChange={onChange} defaultValue={value} />
      { shouldShowError && <span className="text-danger">{error}</span>}
    </div>
  );
};

export default field;
