import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InputGroup, Container, Row, Col } from 'react-bootstrap';
import { CRYPTO_CURRENCY } from 'src/resources/constants/crypto';
import { FIAT_CURRENCY } from 'src/resources/constants/fiat';
import { FaArrowsAltH } from 'react-icons/fa';
import Input from 'src/components/core/controls/input';
import cx from 'classnames';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import { EXCHANGE_DIRECTION, ORDER_TYPE } from 'src/screens/coin/constant';
import { getQuote, getQuoteReverse } from './action';
import styles from './styles.scss';

const EXCHANGE_TYPE = {
  amount: 'QUOTE',
  fiatAmount: 'QUOTE_REVERSE'
};

class Exchange extends Component {
  constructor() {
    super();
    this.state = {
      amount: 0,
      fiatAmount: 0,
      isExchanging: false,
      exchangeData: {}
    };

    this.getQuoteHandler = debounce(::this.getQuoteHandler, 1000);
    this.getQuoteReverseHandler = debounce(::this.getQuoteReverseHandler, 1000);
  }

  componentDidUpdate(prevProps) {
    const { orderType, currency } = this.props;
    if (prevProps?.orderType !== orderType) {
      this.dataCallbackHandler();
    }
    if (prevProps?.currency !== currency) {
      this.getExchange();
    }
  }

  onChange = (field, e) => {
    const value = e?.target?.value;
    const state = {};
    if (field === 'amount') {
      state.fiatAmount = 0;
      state.amount = value;
    } else if (field === 'fiatAmount'){
      state.amount = 0;
      state.fiatAmount = value;
    }
    this.setState({ ...state, exchangeType: EXCHANGE_TYPE[field], isExchanging: true }, this.getExchange);
    this.setExchangeStatus(true);
  }

  setExchangeStatus = (status = false) => {
    this.setState({ isExchanging: status });
  };

  dataCallbackHandler = () => {
    const { onChange, currency, fiatCurrency } = this.props;
    const { amount } = this.state;
    const fiatAmount = this.getFiatAmount();
    if (typeof onChange === 'function') {
      onChange({
        amount,
        fiatAmount,
        currency,
        fiatCurrency
      });
    }
  }

  getQuoteHandler = async () => {
    try {
      console.warn('User check!');
      const { amount } = this.state;
      const { currency, fiatCurrency, direction, getQuote } = this.props;
      const exchangeData = await getQuote({
        amount,
        currency,
        fiat_currency: fiatCurrency,
        check: 0,
        user_check: 0,
        direction,
      });
      const fiatAmount = this.getFiatAmount(exchangeData);
      this.setState({
        exchangeData,
        fiatAmount
      }, this.dataCallbackHandler);
      this.setExchangeStatus(false);
    } catch(e) {
      console.warn(e);
      this.setExchangeStatus(false);
    }
  }

  getQuoteReverseHandler = async () => {
    try {
      console.warn('User check!');
      const { fiatAmount } = this.state;
      const { currency, fiatCurrency, direction, orderType, getQuoteReverse } = this.props;
      const exchangeData = await getQuoteReverse({
        fiat_amount: fiatAmount,
        currency,
        fiat_currency: fiatCurrency,
        check: 0,
        user_check: 0,
        direction,
        order_type: orderType
      });
      this.setState({
        exchangeData,
        amount: exchangeData?.amount || 0
      }, this.dataCallbackHandler);
      this.setExchangeStatus(false);
    } catch(e) {
      console.warn(e);
      this.setExchangeStatus(false);
    }
  }

  getExchange = () => {
    this.setExchangeStatus(true);
    const { exchangeType } = this.state;
    if (exchangeType === EXCHANGE_TYPE.amount) {
      this.getQuoteHandler();
    } else if (exchangeType === EXCHANGE_TYPE.fiatAmount) {
      this.getQuoteReverseHandler();
    } 
  }

  getFiatAmount = (exchangeData = this.state.exchangeData) => {
    const { orderType } = this.props;
    if (orderType === ORDER_TYPE.cod)
      return exchangeData.fiatLocalAmountCod || 0;
    return exchangeData.fiatLocalAmount || 0;
  }

  render() {
    const { amount, fiatAmount, isExchanging } = this.state;
    const { markRequired, onFocus, onBlur, currency, fiatCurrency } = this.props;
    return (
      <Container fluid className={styles.container}>
        <Row noGutters>
          <Col sm={5}>
            <InputGroup>
              <Input
                onFocus={() => onFocus()}
                label="Amount to buy"
                placeholder="0.0"
                value={amount}
                onBlur={() => onBlur()}
                containerClassname={styles.inputWrapper}
                className={markRequired && !amount ? 'border-danger' : ''}
                onChange={this.onChange.bind(this, 'amount')}
              />
              <InputGroup.Prepend>
                <span className={styles.prepend}>{currency}</span>
              </InputGroup.Prepend>
            </InputGroup>
          </Col>
          <Col sm={2}>
            <div className={cx(styles.exchangeIcon, 'd-none d-sm-block')}>
              <FaArrowsAltH className={styles.arrowIcon} color={isExchanging ? 'green' : ''} />
            </div>
          </Col>
          <Col sm={5}>
            <InputGroup>
              <Input
                label="How much do you want?"
                placeholder="0.0"
                value={fiatAmount}
                onFocus={() => onFocus()}
                onBlur={() => onBlur()}
                containerClassname={styles.inputWrapper}
                className={markRequired && !fiatAmount ? 'border-danger' : ''}
                onChange={this.onChange.bind(this, 'fiatAmount')}
              />
              <InputGroup.Prepend>
                <span className={styles.prepend}>{fiatCurrency}</span>
              </InputGroup.Prepend>
            </InputGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapDispatch = { getQuote, getQuoteReverse };

Exchange.defaultProps = {
  currency: CRYPTO_CURRENCY.ETH,
  fiatCurrency: FIAT_CURRENCY.USD,
  direction: EXCHANGE_DIRECTION.buy,
  orderType: ORDER_TYPE.bank,
  markRequired: false,
  onBlur: null,
  onFocus: null
};

Exchange.propTypes = {
  currency: PropTypes.oneOf(Object.values(CRYPTO_CURRENCY)),
  fiatCurrency: PropTypes.oneOf(Object.values(FIAT_CURRENCY)),
  direction: PropTypes.oneOf(Object.values(EXCHANGE_DIRECTION)),
  orderType: PropTypes.oneOf(Object.values(ORDER_TYPE)),
  getQuote: PropTypes.func.isRequired,
  getQuoteReverse: PropTypes.func.isRequired,
  markRequired: PropTypes.bool,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
};

export default connect(null, mapDispatch)(Exchange);
