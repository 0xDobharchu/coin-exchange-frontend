import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showAlert } from 'src/screens/app/redux/action';
import { EXCHANGE_DIRECTION } from 'src/screens/coin/constant';
import { URL } from 'src/resources/constants/url';
import QrCode from 'qrcode.react';
import { formatMoneyByLocale } from 'src/utils/format/curency';
import { Container, Row, Col, Card } from 'react-bootstrap';
import ClockCount from 'src/components/clockCount';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { getQuote } from 'src/screens/coin/components/exchange/action';
import { withRouter } from 'react-router-dom';
import cx from 'classnames';
import OptionMenu from 'src/components/optionMenu';
import { FaRegCopy } from 'react-icons/fa';
import LabelLang from 'src/lang/components/LabelLang';
import { isEmpty } from 'lodash';
import styles from './styles.scss';
import { checkAddress, makeOrder } from './action';

const getIntlKey = (name) => `coin.components.sellOrderInfo.${name}`;

class OrderInfo extends Component {
  constructor() {
    super();
    this.state = {
      exchangeData: {},
    };
  }

  static getDerivedStateFromProps(nextProps, nextState) {
    const state = {};
    if (isEmpty(nextState.exchangeData) && nextProps.pendingOrder?.exchangeData) {
      state.exchangeData = nextProps.pendingOrder?.exchangeData;
    }
    return state;
  }

  componentDidMount() {
    this.refreshPrice();
  }

  refreshPrice = () => {
    const { exchangeData } = this.state;
    if (isEmpty(exchangeData)) return;

    const { getQuote } = this.props;
    const { amount, currency, fiatCurrency } = exchangeData;
    getQuote({params: {
      amount,
      currency,
      fiat_currency: fiatCurrency,
      check: 0,
      user_check: 0,
      direction: EXCHANGE_DIRECTION.sell,
    }}).then(info => {
      info && this.setState({
        exchangeData: info
      });
    });
  }

  makeOrder = () => {
    const { makeOrder, pendingOrder: { orderType, userInfo, orderUserPaymentType }, generatedAddress } = this.props;
    const { exchangeData } = this.state;
    const payload = {
      amount: String(exchangeData?.amount),
      currency: exchangeData?.currency,
      fiat_local_amount: String(exchangeData?.fiatAmount),
      fiat_local_currency: exchangeData?.fiatCurrency,
      direction: EXCHANGE_DIRECTION.sell,
      address: generatedAddress,
      order_user_payment_type: orderUserPaymentType,
      order_type: orderType,
      user_info: userInfo && JSON.stringify(userInfo)
    };

    makeOrder(payload)
      .then(this.orderSuccessHandler)
      .catch(this.orderFailedHandler);
  }

  orderSuccessHandler = (/* orderInfo */) => {
    const { showAlert, history, onFinishOrder } = this.props;
    if (typeof onFinishOrder === 'function') {
      onFinishOrder();
    }
    showAlert({
      message: <LabelLang id={getIntlKey('orderSuccessful')} />,
      timeOut: 1000,
    });
    history.push(URL.ME_HISTORY);
  }

  orderFailedHandler = () => {
    const { showAlert } = this.props;
    showAlert({
      message: <LabelLang id={getIntlKey('orderFailed')} />,
      type: 'danger',
      timeOut: 1000,
    });
  }

  prepareToOrder = async () => {
    try {
      const { exchangeData } = this.state;
      const { checkAddress, showAlert, generatedAddress } = this.props;

      if (isEmpty(exchangeData) || !generatedAddress) return;

      const { currency } = exchangeData;
      const isAddressValid = await checkAddress({ currency, address: generatedAddress });
      if (isAddressValid?.hasTransaction) {
        this.makeOrder();
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
    if (!generatedAddress) return null;
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
    const { exchangeData: { fiatAmount, fiatCurrency, amount, currency } } = this.state;
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

  onCancel = () => {
    const { onCancelOrder } = this.props;
    if (typeof onCancelOrder === 'function') {
      onCancelOrder();
    }
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
    const { generatedAddress, className, pendingOrder } = this.props;
    if (!pendingOrder || !generatedAddress) return null;
    return (
      <Container className={cx(styles.container, className)}>
        <Row>
          <Card border="secondary" className={styles.card}>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <LabelLang id={getIntlKey('cardName')} />
              <OptionMenu
                items={[
                  {
                    label: <LabelLang id={getIntlKey('cancelOrder')} />,
                    onClick: this.onCancel,
                  }
                ]}
                drop='left'
                flip
              />
            </Card.Header>
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
                  {this.renderAddressWallet(generatedAddress)}
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
  getQuote,
  makeOrder,
};

const mapState = state => ({
  generatedAddress: state.sellCoinReducer.generatedAddress,
  pendingOrder: state.sellCoinReducer.pendingOrder,
});

OrderInfo.defaultProps = {
  className: '',
  generatedAddress: null,
  pendingOrder: null,
  onFinishOrder: null
};

OrderInfo.propTypes = {
  showAlert: PropTypes.func.isRequired,
  pendingOrder: PropTypes.object,
  generatedAddress: PropTypes.string,
  className: PropTypes.string,
  makeOrder: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  getQuote: PropTypes.func.isRequired,
  onFinishOrder: PropTypes.func,
};

export default withRouter(connect(mapState, mapDispatchToProps)(OrderInfo));
