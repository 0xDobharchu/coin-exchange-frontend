import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { coinGetSellPrice, coinGetBuyPrice } from 'src/screens/coin/action';
import { connect } from 'react-redux';
import { formatMoneyByLocale } from 'src/utils/format/curency';
import { injectIntl } from 'react-intl';
import styles from './styles.scss';

class CryptoPrice extends Component {
  constructor() {
    super();
    this.state = {
      crypto: null,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const state = {};
    if (nextProps.crypto?.id !== prevState.crypto?.id) {
      state.crypto = nextProps.crypto;
    }
    return state;
  }

  componentDidMount() {
    this.getPrice();
  }

  shouldComponentUpdate(prevProps, prevState) {
    if (prevState.crypto?.id !== this.state.crypto?.id) {
      this.getPrice();
    }
    return true;
  }

  getPrice = () => {
    const { crypto } = this.state;
    if (!crypto?.id) return;
    this.props.coinGetBuyPrice({
      currency: crypto?.id,
      amount: 1,
      fiat_currency: 'VND',
      type: 'bank',
      level: 1,
      user_check: 1,
      check: 1
    });
    this.props.coinGetSellPrice({
      currency: crypto?.id,
      amount: 1,
      fiat_currency: 'VND',
      type: 'bank',
      level: 1,
      user_check: 1,
      check: 1
    });
  }

  render() {
    const { sellPrice, buyPrice } = this.props;
    const { crypto } = this.state;
    const { logo, name } = crypto || {};
    const sellPriceStr = `${formatMoneyByLocale(sellPrice?.fiatLocalAmount || 0)} ${sellPrice?.fiatLocalCurrency}`;
    const buyPriceStr = `${formatMoneyByLocale(buyPrice?.fiatLocalAmount || 0)} ${buyPrice?.fiatLocalCurrency}`;
    if (!sellPrice && !buyPrice) {
      return null;
    }

    return (
      <div className={styles.container}>
        <div className={styles.label}>
          <img src={logo} alt="" />
          <span>{name}</span>
        </div>
        {buyPrice && (
          <div className={styles.buy}>
            <span>Buy</span>
            <span>{buyPriceStr}</span>
          </div>
        )}
        {sellPrice && (
          <div className={styles.sell}>
            <span>Sell</span>
            <span>{sellPriceStr}</span>
          </div>
        )}
      </div>
    );
  }
}

const mapDispatch = {
  coinGetSellPrice,
  coinGetBuyPrice,
};

const mapState = (state, props) => ({
  country: 'VN',
  sellPrice: state.coin?.sellPrice[props?.crypto?.id],
  buyPrice: state.coin?.buyPrice[props?.crypto?.id],
});

CryptoPrice.defaultProps = {
  sellPrice: null,
  buyPrice: null,
};

CryptoPrice.propTypes = {
  sellPrice: PropTypes.object,
  buyPrice: PropTypes.object,
  coinGetBuyPrice: PropTypes.func.isRequired,
  coinGetSellPrice: PropTypes.func.isRequired,
};

export default injectIntl(connect(mapState, mapDispatch)(CryptoPrice));
