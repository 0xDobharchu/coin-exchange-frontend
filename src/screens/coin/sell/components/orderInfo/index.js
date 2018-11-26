import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showAlert } from 'src/screens/app/redux/action';
import { EXCHANGE_DIRECTION } from 'src/screens/coin/constant';
import QrCode from 'qrcode.react';
import { formatMoneyByLocale } from 'src/utils/format/curency';
import { Container, Row, Col, Card } from 'react-bootstrap';
import ClockCount from 'src/components/clockCount';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { getQuote } from 'src/screens/coin/components/exchange/action';
import cx from 'classnames';
import { FaRegCopy } from 'react-icons/fa';
import styles from './styles.scss';
import { checkAddress } from './action';

class OrderInfo extends Component {
  constructor(props) {
    super();
    this.state = {
      orderInfo: props?.orderInfo || {},
    };
  }

  refreshPrice = () => {
    const { getQuote } = this.props;
    const { orderInfo: { amount, currency, fiatCurrency } } = this.state;
    getQuote({
      amount,
      currency,
      fiat_currency: fiatCurrency,
      check: 0,
      user_check: 0,
      direction: EXCHANGE_DIRECTION.sell,
    }).then(info => {
      this.setState({
        orderInfo: {
          amount: info?.amount,
          currency: info?.currency,
          fiatAmount: info?.fiatLocalAmount,
          fiatCurrency: info?.fiatLocalCurrency,
        }
      });
    });
  }

  
  prepareToOrder = async () => {
    try {
      const { checkAddress, showAlert, generatedAddress, onMakeOrder } = this.props;
      const { orderInfo: { currency } } = this.state;
      const isAddressValid = await checkAddress({ currency, address: generatedAddress });
      if (isAddressValid?.hasTransaction) {
        if (typeof onMakeOrder === 'function') {
          onMakeOrder();
        }
      } else {
        showAlert({
          message: 'You have to transfer coin to this address first',
          type: 'danger',
          timeOut: 1000,
        });
      }
    } catch(e) {
      console.warn(e);
    }
  }

  onCountdownExpired = () => {
    this.refreshPrice();
  }

  copied = () => {
    const { showAlert } = this.props;
    showAlert({
      message: 'Copied',
      timeOut: 3000,
      isShowClose: true,
      type: 'success',
    });
  }

  renderAddressWallet = (generatedAddress) => {
    return (
      <CopyToClipboard text={generatedAddress} onCopy={this.copied}>
        <div className={cx(styles.wallet, 'common-clickable')}>
          <div className={styles.address}>
            <span>{generatedAddress}</span>
            <FaRegCopy className={styles.iconCopy} color="green" />
          </div>
          <QrCode className={styles.qrCode} value={generatedAddress} />
        </div>
      </CopyToClipboard>
    );
  }

  renderInfo = () => {
    const { orderInfo: { fiatAmount, fiatCurrency, amount, currency } } = this.state;
    const infos = [
      {
        name: 'Receiving',
        value: `${formatMoneyByLocale(fiatAmount) || ''} ${fiatCurrency || ''}`,
      },
      {
        name: 'Selling',
        value: `${amount || ''} ${currency || ''}`,
      },
    ];
    return (
      <Container className={styles.infos}>
        {infos.map(({ name, value }) => (
          <Row key={name}>
            <Col className={styles.infoTitle}>{name}</Col>
            <Col className={styles.infoValue}>{value}</Col>
          </Row>
        ))}
      </Container>
    );
  }

  renderNotes = () => {
    const notes = {
      main_note: 'NOTE: YOU HAVE TO CLICK "FINISH" TO COMPLETE THE TRANSACTION',
      sub_note: '(Transaction may be lost if you forget to complete this step)',
      list: [
        'Please transfer the exact number to the above address',
        'The price of the crypto fluctuates constantly; therefore, we only keep this price for 5 minutes',
        'We will transfer the fiat to you as soon as there is 1 confirmation on the network.'
      ]
    };
    return (
      <div className={styles.noteContainer}>
        <div>
          <span className={styles.mainNote}>{notes.main_note}</span>
          <span className={styles.subNote}>{notes.sub_note}</span>
        </div>
        <ul>
          {
            notes.list?.map((note, index) => (<li key={index}><span>{note}</span></li>))
          }
        </ul>
      </div>
    );
  }

  render() {
    const { generatedAddress } = this.props;
    if (!generatedAddress) {
      return null;
    }
    return (
      <Container className={styles.container}>
        <Row>
          <Card border="secondary" className={styles.card}>
            <Card.Header>ORDER INFO</Card.Header>
            <Card.Body>
              <Container>
                <Row className={styles.orderTimeout}>
                  <span>Price will be updated after </span>
                  <ClockCount
                    className={styles.clock}
                    internalClockdown
                    loop
                    duration={5}
                    onExpired={this.onCountdownExpired}
                  />
                </Row>
                <Row>
                  {this.renderInfo()}
                </Row>
                <Row>
                  { generatedAddress && this.renderAddressWallet(generatedAddress) }
                </Row>
                <Row>
                  {this.renderNotes()}
                </Row>
              </Container>
            </Card.Body>
          </Card>
        </Row>
        <Row>
          <button className={styles.doneBtn} type="button" onClick={this.prepareToOrder}>Place order</button>
        </Row>
      </Container>
    );
  }
}

const mapDispatchToProps = {
  showAlert,
  checkAddress,
  getQuote
};

OrderInfo.defaultProps = {
  onMakeOrder: null,
};

OrderInfo.propTypes = {
  showAlert: PropTypes.func.isRequired,
  generatedAddress: PropTypes.string.isRequired,
  onMakeOrder: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(OrderInfo);
