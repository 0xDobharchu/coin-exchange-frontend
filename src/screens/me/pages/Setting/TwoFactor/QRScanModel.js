import React from 'react';
import { sendTwoFactorCode } from 'src/screens/auth/redux/api';
import QRCode from 'qrcode.react';
import { Input } from 'src/components/custom';
import { Modal, Button } from 'react-bootstrap';

class QRScanModel extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      code: '',
    };
  }

  onChangeCode = event => {
    console.log('onchange code , ', event.target.value);
    this.setState({ code: event.target.value });
  }
  onSubmitCode = () => {
    sendTwoFactorCode(this.state.code).then(this.props.onHide()).catch(err => err);
  }
  render() {
    const { qrValue, onHide } = this.props;
    return (
      <Modal
        {...this.props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Scan QR Code
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <QRCode value={qrValue} />
          <br />
          <Input placeholder="Enter your code" value={this.state.code} onChange={this.onChangeCode} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={onHide}>Close</Button>
          <Button variant="primary" onClick={this.onSubmitCode}>Submit</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default QRScanModel;
