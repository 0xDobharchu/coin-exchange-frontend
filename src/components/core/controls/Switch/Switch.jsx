/* eslint camelcase:0 */

import React from 'react';
import PropTypes from 'prop-types';
// component
import './Switch.scss';

class Switch extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: this.props.isChecked || false
    };
  }

  UNSAFE_componentWillReceiveProps({ isChecked }) {
    typeof isChecked === 'boolean' && this.setState({ isChecked });
  }

  onChange = () =>{
    const {onChange} = this.props || null;
    const {isChecked} = this.state || false;
    this.setState({ isChecked: !isChecked}, () => {
      if (onChange) onChange(isChecked);
    });
  }

  render() {
    return (

      <div className="switch-component">
        <label className="switch">
          <input type="checkbox" checked={this.state.isChecked} onChange={this.onChange} />
          <span className="slider round" />
        </label>
      </div>
    );
  }
}

Switch.propType = {
  onChange: PropTypes.func,
  isChecked: PropTypes.bool,
};

export default Switch;
