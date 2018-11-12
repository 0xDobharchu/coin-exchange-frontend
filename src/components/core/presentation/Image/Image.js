import React from 'react';
import PropTypes from 'prop-types';

class Image extends React.PureComponent {
  render() {
    const { innerRef, ...props } = this.props;
    return (
      <img alt="Loading" ref={innerRef} {...props} />
    );
  }
}

Image.defaultProps = {
  innerRef: null,
};

Image.propTypes = {
  innerRef: PropTypes.func // instead of ref
};

export default Image;
