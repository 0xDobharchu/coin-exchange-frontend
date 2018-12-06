import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './styles.scss';

class Input extends PureComponent {
  constructor() {
    super();

    this.input = null;
  }

  render() {
    const {
      label,
      labelClassname,
      containerClassname,
      truncateLabel,
      name,
      value,
      autoCompleteOff,
      autoComplete,
      ...inputProps
    } = this.props;

    const input = (
      <input
        ref={input => this.input = input}
        name={name}
        value={value || ''}
        autoComplete={autoCompleteOff ? 'auto-complete-off-!trick!' : autoComplete}
        {...inputProps}
      />
    );
    if (!label) {
      return input;
    }
    return (
      <label className={cx(styles.container, containerClassname)}>
        <span className={cx(styles.label, truncateLabel && 'text-truncate ', labelClassname)}>{label}</span>
        {input}
      </label>
    );
  }
}

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
