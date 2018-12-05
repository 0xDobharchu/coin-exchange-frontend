import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './styles.scss';

const Input = (props) => {
  const { label, labelClassname, containerClassname, truncateLabel, name, value, ...inputProps } = props;
  if (!label) {
    return (
      <input
        name={name}
        value={value || ''}
        {...inputProps}
      />
    );
  }
  return (
    <label className={cx(styles.container, containerClassname)}>
      <span className={cx(styles.label, truncateLabel && 'text-truncate ', labelClassname)}>{label}</span>
      <input
        name={name}
        value={value || ''}
        {...inputProps}
      />
    </label>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  containerClassname: PropTypes.string,
  labelClassname: PropTypes.string,
  name: PropTypes.string.isRequired,
};

Input.defaultProps = {
  type: 'text',
  containerClassname: '',
  labelClassname: ''
};

export default Input;
