import React from 'react';
import { disableTwoFactorCode } from 'src/screens/auth/redux/api';
import { Input } from 'src/components/custom';
import { Modal, Button } from 'react-bootstrap';

class Disable2FaModel extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      code: '',
    };
  }

  onChangeCode = event => {
    this.setState({ code: event.target.value });
  }
  onSubmitCode = () => {
    disableTwoFactorCode(this.state.code).then(this.props.onHide()).catch(err => err);
  }
  render() {
    const { onHide } = this.props;
    return (
      <Modal
        {...this.props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Disable Two Factor
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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

export default Disable2FaModel;
