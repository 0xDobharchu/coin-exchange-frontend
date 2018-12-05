/* eslint react/prop-types:0 */
import React from 'react';
import PaymentMethod from 'src/screens/coin/components/paymentMethod';
import { PAYMENT_METHOD } from 'src/screens/coin/constant';

const getIntlKey = (name) => `coin.components.paymentMethod.${name}`;

const field = ({ input, meta, className = '' }) => {
  const {
    onChange, value
  } = input;
  const { error, touched } = meta;
  const shouldShowError = !!(touched && error);
  return (
    <div className={className}>
      <PaymentMethod
        onChange={onChange}
        defaultValue={value}
        methods={[
          {
            nameIntl: getIntlKey('wireTransferName'),
            value: PAYMENT_METHOD.TRANSFER
          },
          {
            nameIntl: getIntlKey('codName'),
            value: PAYMENT_METHOD.COD,
            infoIntl: getIntlKey('codInfo'),
          }
        ]}
      />
      { shouldShowError && <small className="text-danger">{error}</small>}
    </div>
  );
};

export default field;
