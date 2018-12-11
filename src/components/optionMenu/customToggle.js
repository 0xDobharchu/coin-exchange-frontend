import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MdMoreHoriz } from 'react-icons/md';
import cx from 'classnames';
import styles from './styles.scss';

class CustomToggle extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    const { onClick } = this.props;
    onClick(e);
  }

  render() {
    return (
      <MdMoreHoriz onClick={this.handleClick} className={cx('common-clickable', styles.icon)} />
    );
  }
}

CustomToggle.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default CustomToggle;