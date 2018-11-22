import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './styles.scss';

const Input = (props) => {
  const { label, labelClassname, containerClassname,  ...inputProps } = props;
  return (
    <label className={cx(styles.container, containerClassname)}>
      <span className={cx(styles.label, labelClassname)}>{label}</span>
      <input
        {...inputProps}
      />
    </label>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  containerClassname: PropTypes.string,
  labelClassname: PropTypes.string,
};

Input.defaultProps = {
  type: 'text',
  containerClassname: '',
  labelClassname: ''
};

export default Input;
