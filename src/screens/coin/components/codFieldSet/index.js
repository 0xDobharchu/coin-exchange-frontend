import React from 'react';
import cx from 'classnames';
import { Field } from 'redux-form';
import inputField from 'src/components/core/form/fields/input';
import phoneField, { phoneValidator } from 'src/components/core/form/fields/phone';
import popularPlacesField, { popularPlacesValidator } from './reduxFormFields/popularPlaces';
import styles from './styles.scss';

const CodFieldSet = (props) => {
  const { show, intl: { formatMessage }, className } = props;

  return (
    <div className={cx(styles.codInfo, show ? cx(styles.showCod, className) : styles.hideCod)}>
      <Field
        name="address"
        placeholder={formatMessage({ id: 'coin.buy.userAddress' })}
        component={popularPlacesField}
        containerClassname={styles.codItem}
        validate={show ? popularPlacesValidator : []}
      />
      <Field
        name="phone"
        placeholder={formatMessage({ id: 'coin.buy.userPhone' })}
        component={phoneField}
        containerClassName={styles.codItem}
        validate={show ? phoneValidator : []}
      />
      <Field
        type="text"
        placeholder={formatMessage({ id: 'coin.buy.userNote' })}
        name="noteAndTime"
        component={inputField}
        containerClassName={styles.codItem}
        // validate={show ? required : []}
      />
    </div>
  );
};

export default CodFieldSet;