import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setNotFound, clearNotFound } from 'src/screens/app/redux/action';

class DynamicImport extends React.Component {
  static propTypes = {
    load: PropTypes.func.isRequired,
    children: PropTypes.any.isRequired,
    loading: PropTypes.func.isRequired,
    isNotFound: PropTypes.bool,
    setNotFound: PropTypes.func.isRequired,
    clearNotFound: PropTypes.func.isRequired,
  }

  static defaultProps = {
    isNotFound: false,
  }

  constructor(props) {
    super(props);
    this.state = {
      component: props.loading,
    };

    if (props.isNotFound) {
      props.setNotFound();
    } else {
      props.clearNotFound();
    }
  }

  componentDidMount() {
    // eslint-disable-next-line
    this.props.load()
      .then((component) => {
        this.setState(() => ({
          component: component.default ? component.default : component,
        }));
      });
  }

  render() {
    const { children } = this.props;
    const { component } = this.state;
    return children(component);
  }
}

export default connect(null, ({ setNotFound, clearNotFound }))(DynamicImport);
