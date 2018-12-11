import React from 'react';
import { Ethereum } from 'src/services/Wallets/Ethereum';
import { LabelLang } from 'src/lang/components';
import { Modal, Button, Row } from 'react-bootstrap';
import ConfirmDialog from 'src/components/confirmDialog';
import style from './popup.scss';

const getBtcTransaction = hash => `https://www.blockchain.com/btc/tx/${hash}`;
const transformString = str =>  str ? (str.substring(0, 7) + '...'+ str.substring(str.length-5, str.length)) : '';
const colorSchema = {
  warning: ['pending', 'processing', 'fiat_transferring', 'transferring'],
  success: ['transferred', 'success'],
  danger: ['transfer_failed', 'cancelled', 'rejected', 'expired']
};
const getOrderStatus = (status) => {
  const statusMsg = `me.history.orderStatus.${status}`;
  if (colorSchema.success.indexOf(status) >=0 ) {
    return <span className={style.success}><LabelLang id={statusMsg} /></span>;
  }
  if (colorSchema.danger.indexOf(status) >=0 ) {
    return <span className={style.danger}><LabelLang id={statusMsg} /></span>;
  }
  if (colorSchema.warning.indexOf(status) >=0 ) {
    return <span className={style.warning}><LabelLang id={statusMsg} /></span>;
  }
};
const getDirection = direction => {
  const statusMsg = `me.history.direction.${direction}`;
  const directionStyle = direction === 'buy' ? style.success : style.danger;
  return <span className={directionStyle}><LabelLang id={statusMsg} /></span>;
};

class PopupDetail extends React.Component {

  constructor(props) {
    super(props);
    this.confirmDialogCancel = React.createRef();
  }
  showData = (data) => {
    this.setState({ ...data });
  }

  handleOnCancel = () => this.confirmDialogCancel.current.show();
  onConfirmCancel = () => {
    const { onCancelTransaction, data: { id } }= this.props;
    if (typeof onCancelTransaction === 'function') {
      onCancelTransaction(id);
    }
  }
  render() {
    const { onHide } = this.props;
    const { data :{ created_at, direction, amount, currency, status, fiat_local_amount, fiat_local_currency, tx_hash, ref_code } } = this.props;
    const eth = new Ethereum();
    eth.network = Ethereum.Network.Mainnet;
    const linkHash = currency === 'ETH' ? eth.getAPIUrlTransaction(tx_hash) : getBtcTransaction(tx_hash);
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
        <Modal.Body className={style.container}>
          <Row>
            <span><LabelLang id="me.history.date" /></span>
            <span>{new Date(created_at).toLocaleString()}</span>
          </Row>
          <Row>
            <span><LabelLang id="me.history.refcode" /></span>
            <span>{ref_code}</span>
          </Row>
          <Row>
            <span><LabelLang id="me.history.type" /></span>
            {getDirection(direction)}
          </Row>
          <Row>
            <span><LabelLang id="me.history.amount" /></span>
            <span>{`${Number(amount).toFixed(2)} ${currency}`}</span>
          </Row>
          <Row>
            <span><LabelLang id="me.history.status" /></span>
            {getOrderStatus(status)}
          </Row>
          <Row>
            <span><LabelLang id="me.history.value" /></span>
            <span>{`${fiat_local_amount} ${fiat_local_currency}`}</span>
          </Row>
          {tx_hash && (
          <Row>
            <span><LabelLang id="me.history.link" /></span>
            <span><a href={linkHash} target='_blank' rel='noopener noreferrer'>{transformString(tx_hash)}</a></span>
          </Row>)}
          {status === 'pending' && direction === 'buy' && (
          <Row>
            <span><LabelLang id="me.history.action" /></span>
            <button type="button" onClick={this.handleOnCancel}><LabelLang id="me.history.cancel" /></button>
          </Row>)}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={onHide}><LabelLang id="me.history.close" /></Button>
        </Modal.Footer>
        <ConfirmDialog
          title={<LabelLang id="me.history.dialog.cancel.title" />}
          body={<LabelLang id="me.history.dialog.cancel.body" />}
          confirmText={<LabelLang id="me.history.dialog.cancel.confirm" />}
          cancelText={<LabelLang id="me.history.dialog.cancel.cancel" />}
          ref={this.confirmDialogCancel}
          onConfirm={this.onConfirmCancel}
        />
      </Modal>
    );
  }
}

export default PopupDetail;
