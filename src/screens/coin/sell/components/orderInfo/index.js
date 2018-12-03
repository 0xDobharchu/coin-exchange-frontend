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
import LabelLang from 'src/lang/components/LabelLang';
import styles from './styles.scss';
import { checkAddress } from './action';

const getIntlKey = (name) => `coin.components.sellOrderInfo.${name}`;

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
          message: <LabelLang id={getIntlKey('transferCoinFirst')} />,
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
      message: <LabelLang id='app.common.copied' />,
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
        id: 1,
        name: <LabelLang id={getIntlKey('Receiving')} />,
        value: `${formatMoneyByLocale(fiatAmount) || ''} ${fiatCurrency || ''}`,
      },
      {
        id: 2,
        name: <LabelLang id={getIntlKey('Selling')} />,
        value: `${amount || ''} ${currency || ''}`,
      },
    ];
    return (
      <Container className={styles.infos}>
        {infos.map(({ id, name, value }) => (
          <Row key={id}>
            <Col className={styles.infoTitle}>{name}</Col>
            <Col className={styles.infoValue}>{value}</Col>
          </Row>
        ))}
      </Container>
    );
  }

  renderNotes = () => {
    const notes = {
      main_note: getIntlKey('mainNote'),
      sub_note: getIntlKey('subNote'),
      list: [
        getIntlKey('listNote.note1'),
        getIntlKey('listNote.note2'),
        getIntlKey('listNote.note3')
      ]
    };
    return (
      <div className={styles.noteContainer}>
        <div>
          <span className={styles.mainNote}><LabelLang id={notes.main_note} /></span>
          <span className={styles.subNote}><LabelLang id={notes.sub_note} /></span>
        </div>
        <ul>
          {
            notes.list?.map((note, index) => (<li key={index}><span><LabelLang id={note} /></span></li>))
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
            <Card.Header><LabelLang id={getIntlKey('cardName')} /></Card.Header>
            <Card.Body>
              <Container>
                <Row className={styles.orderTimeout}>
                  <span><LabelLang id={getIntlKey('priceWillUpdateIn')} /></span>
                  <ClockCount
                    className={styles.clock}
                    internalClockdown
                    loop
                    duration={300}
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
          <button className={styles.doneBtn} type="button" onClick={this.prepareToOrder}>
            <LabelLang id={getIntlKey('orderBtn')} />
          </button>
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
