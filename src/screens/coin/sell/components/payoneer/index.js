import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import inputField from 'src/components/core/form/fields/input';
import isEmail from 'src/components/core/form/validator/isEmail';
import styles from './styles.scss';

const getIntlKey = (name) => `coin.sell.${name}`;
const email = isEmail();
const Payoneer = ({ show, className, intl: { formatMessage } }) => {
  return (
    <div className={cx(styles.container, show ? cx(styles.show, className) : styles.hide)}>
      <Field
        type='email'
        name="payoneerEmail"
        placeholder={formatMessage({ id: getIntlKey('payoneerEmail')})}
        component={inputField}
        containerClassName={styles.item}
        validate={show ? email : []}
      />
    </div>
  );
};

Payoneer.defaultProps = {
  className: ''
};

Payoneer.propTypes = {
  show: PropTypes.bool.isRequired,
  className: PropTypes.string,
};

export default Payoneer;