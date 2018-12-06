import React from 'react';
import { LabelLang } from 'src/lang/components';
import { Modal, Button, Row, Col } from 'react-bootstrap';

class PopupDetail extends React.Component {

  showData = (data) => {
    this.setState({ ...data });
  }

  render() {
    const { onHide } = this.props;
    const { data :{ created_at, direction, amount, currency, status, fiat_local_amount, fiat_local_currency, link, ref_code } } = this.props;
    return (
      <Modal
        {...this.props}
        size="large"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <LabelLang id="me.history.detail" />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <br />
          <Row style={{ width: '100%' }}>
            <Col xs={3}><LabelLang id="me.history.date" /></Col>
            <Col xs={9}>{new Date(created_at).toLocaleString()}</Col>
          </Row>
          <Row style={{ width: '100%' }}>
            <Col xs={3}><LabelLang id="me.history.refcode" /></Col>
            <Col xs={9}>{ref_code}</Col>
          </Row>
          <Row style={{ width: '100%' }}>
            <Col xs={3}><LabelLang id="me.history.type" /></Col>
            <Col xs={9}>{direction}</Col>
          </Row>
          <Row style={{ width: '100%' }}>
            <Col xs={3}><LabelLang id="me.history.amount" /></Col>
            <Col xs={9}>{`${Number(amount).toFixed(2)} ${currency}`}</Col>
          </Row>
          <Row style={{ width: '100%' }}>
            <Col xs={3}><LabelLang id="me.history.status" /></Col>
            <Col xs={9}>{status || 'None'}</Col>
          </Row>
          <Row style={{ width: '100%' }}>
            <Col xs={3}><LabelLang id="me.history.value" /></Col>
            <Col xs={9}>{`${fiat_local_amount} ${fiat_local_currency}`}</Col>
          </Row>
          <Row style={{ width: '100%' }}>
            <Col xs={3}><LabelLang id="me.history.link" /></Col>
            <Col xs={9}>{link || 'nolink'}</Col>
          </Row>
          {status === 'pending' && (
          <Row style={{ width: '100%' }}>
            <Col xs={3}><LabelLang id="me.history.action" /></Col>
            <Col xs={9}><button type="button"><LabelLang id="me.history.cancel" /></button></Col>
          </Row>)}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={onHide}><LabelLang id="me.history.close" /></Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default PopupDetail;
