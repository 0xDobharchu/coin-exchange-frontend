import React from 'react';
import PropTypes from 'prop-types';

class Checkbox extends React.PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
  }

  render() {
    const { label, ...props } = this.props;

    return (
      <label className='checkbox-warper'>
        <span>{label}</span>
        <input
          type="checkbox"
          {...props}
        />
        <span className='checkmark' />
      </label>
    );
  }
}

Checkbox.defaultProps = {
};

export default Checkbox;
