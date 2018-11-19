import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './styles.scss';

const Input = (props) => {
  const { label, labelClassname,  ...inputProps } = props;
  return (
    <label className={styles.container}>
      <span className={cx(styles.label, labelClassname)}>{label}</span>
      <input
        {...inputProps}
      />
    </label>
  );
};

Input.propTypes = {
  type: PropTypes.string,
};

Input.defaultProps = {
  type: 'text'
};

export default Input;
