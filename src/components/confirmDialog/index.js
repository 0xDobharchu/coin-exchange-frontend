import React from 'react';
import { Modal, Button } from 'react-bootstrap';

class ConfirmDialog extends React.Component {

  state = {
    show: false,
    data: null,
  }

  show = (data) => this.setState({ show: true, data });

  hide = () => this.setState({ show: false });

  handleConfirm = () => {
    this.hide();
    // eslint-disable-next-line
    this.props.onConfirm(this.state.data);
  }

  render() {
    // eslint-disable-next-line
    const { title, body, confirmText, cancelText } = this.props;
    const { show } = this.state;
    return (
      <Modal
        show={show}
        onHide={this.hide}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {body}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={this.hide}>{cancelText}</Button>
          <Button variant="primary" onClick={this.handleConfirm}>{confirmText}</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ConfirmDialog;
