import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';
import CustomToggle from './customToggle';

class OptionMenu extends Component {
  renderItems = () => {
    const { items } = this.props;
    return items?.map((item, index) => (
      <Dropdown.Item key={`${item?.item} ${index}`} onClick={item?.onClick}>{item?.label}</Dropdown.Item>
    ));
  }

  render() {
    const { items, ...dropdownProps } = this.props;
    if (!items || items?.length === 0) return null;
    return (
      <Dropdown {...dropdownProps}>
        <Dropdown.Toggle as={CustomToggle} className="d-flex justify-content-center align-items-center" />
        <Dropdown.Menu>
          {this.renderItems()}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

OptionMenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node
    ]),
    onClick: PropTypes.func
  })).isRequired
};

export default OptionMenu;