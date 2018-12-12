import React from 'react';
import cx from 'classnames';
import { Field } from 'redux-form';
import inputField from 'src/components/core/form/fields/input';
import isRequired from 'src/components/core/form/validator/isRequired';
import popularBankField, { popularBanksValidator } from './reduxFormFields/popularBank';
import styles from './styles.scss';

const required = isRequired();
const getIntlKey = (name) => `coin.sell.${name}`;
const BankInfoFieldSet = (props) => {
  const { intl: { formatMessage }, className, show } = props;

  return (
    <div className={cx(styles.bankInfo, className)}>
      <Field
        name="bankName"
        placeholder={formatMessage({ id: getIntlKey('bankName')})}
        component={popularBankField}
        containerClassname={styles.bankItem}
        validate={show ? popularBanksValidator : []}
      />
      <Field
        type="text"
        name="bankAccountNumber"
        placeholder={formatMessage({ id: getIntlKey('accountNumber')})}
        component={inputField}
        containerClassName={styles.bankItem}
        validate={show ? required : []}
      />
      <Field
        type="text"
        name="bankAccountName"
        placeholder={formatMessage({ id: getIntlKey('accountName')})}
        component={inputField}
        containerClassName={styles.bankItem}
        validate={show ? required : []}
      />
    </div>
  );
};

export default BankInfoFieldSet;