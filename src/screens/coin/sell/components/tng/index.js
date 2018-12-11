import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import PhoneVerify from '../phoneVerify';
import styles from './styles.scss';

const TNG = ({ show, onTngVerified, className }) => (
  <div className={cx(styles.container, show ? cx(styles.showTng, className) : styles.hideTng)}>
    <PhoneVerify onVerified={onTngVerified} />
  </div>
);

TNG.defaultProps = {
  className: ''
};

TNG.propTypes = {
  show: PropTypes.bool.isRequired,
  onTngVerified: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default TNG;