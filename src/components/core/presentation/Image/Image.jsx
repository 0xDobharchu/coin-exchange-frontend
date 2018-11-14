import React from 'react';
import PropTypes from 'prop-types';

class Image extends React.PureComponent {
  render() {
    const { innerRef, ...props } = this.props;
    return (
      <img ref={innerRef} {...props} alt="" />
    );
  }
}

Image.propTypes = {
  innerRef: PropTypes.func // instead of ref
};

Image.defaultProps = {
  innerRef: null,
};

export default Image;
