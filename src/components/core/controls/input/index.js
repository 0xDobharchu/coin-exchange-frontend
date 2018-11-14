import React from 'react';
import PropTypes from 'prop-types';

const Input = (props) => {
  const { type } = props;
  return (
    <input
      type={type}
    />
  );
};

Input.propTypes = {
  type: PropTypes.string,
};

Input.defaultProps = {
  type: 'text'
};

export default Input;
