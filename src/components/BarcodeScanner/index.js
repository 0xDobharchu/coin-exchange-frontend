import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import Loadable from 'react-loadable';
import { openQrScanner, closeQrScanner } from 'src/screens/app/redux/action';

let component = null;

export const showQrCode = (config = {}) => {
  component.setState({
    config
  });
  component?.show();
};

export const closeQrCode = () => {
  component?.close();
};

class BarcodeScanner extends PureComponent {
  constructor() {
    super();
    this.state = {
      scanner: null,
      config: {}
    };
  }

  componentDidMount() {
    const COM = Loadable({
      loader: () => import('react-qr-reader'),
      loading: () =>  <span>Loading...</span>
    });
    this.setState({ scanner: COM });
    component = this;
  }

  onScan = (data) => {
    const { config: { onData } } = this.state;
    if (typeof onData === 'function') {
      onData(data);
    } 
  }

  onError = (e) => {
    console.warn(e);
    const { config: { onError } } = this.state;
    if (typeof onError === 'function') {
      onError(e);
    } 
  }

  show = () => {
    this.props.openQrScanner();
  };

  close = () => {
    this.props.closeQrScanner();
  };

  render() {
    const  { showQrScanner } = this.props;
    const { scanner: Scanner } = this.state;
    return (
      <Modal show={showQrScanner} onHide={this.close}>
        <Modal.Body>
          {
            Scanner && (
              <Scanner
                onScan={this.onScan}
                onError={this.onError}
              />
            )
          }
        </Modal.Body>
      </Modal>
    );
  }
}

const mapState = ({ app: { openQrScanner } }) => ({ showQrScanner: openQrScanner });

BarcodeScanner.propTypes = {
  showQrScanner: PropTypes.bool.isRequired,
};

export default connect(mapState, { openQrScanner, closeQrScanner })(BarcodeScanner);