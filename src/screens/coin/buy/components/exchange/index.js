import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CRYPTO_CURRENCY } from 'src/resources/constants/crypto';
import { FIAT_CURRENCY } from 'src/resources/constants/fiat';
import { FaArrowsAltH } from 'react-icons/fa';
import Input from 'src/components/core/controls/input';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import { getQuote, getQuoteReverse } from './action';
import styles from './styles.scss';

const EXCHANGE_TYPE = {
  amount: 'QUOTE',
  fiatAmount: 'QUOTE_REVERSE'
};

const EXCHANGE_DIRECTION = {
  buy: 'buy',
  sell: 'sell'
};

const ORDER_TYPE = {
  cod: 'cod',
  bank: 'bank'
};

class Exchange extends Component {
  constructor() {
    super();
    this.state = {
      amount: 0,
      fiatAmount: 0,
      isExchanging: false,
    };

    this.getQuoteHandler = debounce(::this.getQuoteHandler, 1000);
    this.getQuoteReverseHandler = debounce(::this.getQuoteReverseHandler, 1000);
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
    const { amount, fiatAmount } = this.state;
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
      const info = await getQuote({
        amount,
        currency,
        fiat_currency: fiatCurrency,
        check: 0,
        user_check: 0,
        direction,
      });
      this.setState({
        fiatAmount: info.fiatAmount
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
      const info = await getQuoteReverse({
        fiat_amount: fiatAmount,
        currency,
        fiat_currency: fiatCurrency,
        check: 0,
        user_check: 0,
        direction,
        order_type: orderType
      });
      this.setState({
        amount: info.amount
      }, this.dataCallbackHandler);
      this.setExchangeStatus(false);
    } catch(e) {
      console.warn(e);
      this.setExchangeStatus(false);
    }
  }

  getExchange = () => {
    const { exchangeType } = this.state;
    if (exchangeType === EXCHANGE_TYPE.amount) {
      this.getQuoteHandler();
    } else if (exchangeType === EXCHANGE_TYPE.fiatAmount) {
      this.getQuoteReverseHandler();
    } 
  }

  render() {
    const { amount, fiatAmount } = this.state;
    console.log(this.state);
    return (
      <div className={styles.container}>
        <Input
          label="Amount to buy"
          placeholder="0.0"
          value={amount}
          onChange={this.onChange.bind(this, 'amount')}
        />
        <FaArrowsAltH className={styles.arrowIcon} />
        <Input
          label="How much do you want?"
          placeholder="0.0"
          value={fiatAmount}
          onChange={this.onChange.bind(this, 'fiatAmount')}
        />
      </div>
    );
  }
}

const mapDispatch = { getQuote, getQuoteReverse };

Exchange.defaultProps = {
  currency: CRYPTO_CURRENCY.ETH,
  fiatCurrency: FIAT_CURRENCY.USD,
  direction: EXCHANGE_DIRECTION.buy,
  orderType: ORDER_TYPE.bank,
};

Exchange.propTypes = {
  currency: PropTypes.oneOf(Object.values(CRYPTO_CURRENCY)),
  fiatCurrency: PropTypes.oneOf(Object.values(FIAT_CURRENCY)),
  direction: PropTypes.oneOf(Object.values(EXCHANGE_DIRECTION)),
  orderType: PropTypes.oneOf(Object.values(ORDER_TYPE)),
  getQuote: PropTypes.func.isRequired,
  getQuoteReverse: PropTypes.func.isRequired,
};

export default connect(null, mapDispatch)(Exchange);
