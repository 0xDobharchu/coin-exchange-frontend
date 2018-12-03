import React from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';

class PopupDetail extends React.Component {

  showData = (data) => {
    this.setState({ ...data });
  }

  render() {
    const { onHide } = this.props;
    const { data :{ created_at, direction, amount, currency, status, fiat_local_amount, fiat_local_currency, link } } = this.props;
    return (
      <Modal
        {...this.props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Detail
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <br />
          <Row style={{ width: '100%' }}>
            <Col xs={3}>Date</Col>
            <Col xs={9}>{new Date(created_at).toLocaleString()}</Col>
          </Row>
          <Row style={{ width: '100%' }}>
            <Col xs={3}>Type</Col>
            <Col xs={9}>{direction}</Col>
          </Row>
          <Row style={{ width: '100%' }}>
            <Col xs={3}>Amount</Col>
            <Col xs={9}>{`${Number(amount).toFixed(2)} ${currency}`}</Col>
          </Row>
          <Row style={{ width: '100%' }}>
            <Col xs={3}>Status</Col>
            <Col xs={9}>{status || 'None'}</Col>
          </Row>
          <Row style={{ width: '100%' }}>
            <Col xs={3}>Value</Col>
            <Col xs={9}>{`${fiat_local_amount} ${fiat_local_currency}`}</Col>
          </Row>
          <Row style={{ width: '100%' }}>
            <Col xs={3}>Link</Col>
            <Col xs={9}>{link || 'nolink'}</Col>
          </Row>
          {status === 'pending' && (
          <Row style={{ width: '100%' }}>
            <Col xs={3}>Action</Col>
            <Col xs={9}><button type="button">Cancel</button></Col>
          </Row>)}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default PopupDetail;
