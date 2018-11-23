import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { coinGetSellPrice, coinGetBuyPrice } from 'src/screens/coin/action';
import { connect } from 'react-redux';
import { formatMoneyByLocale } from 'src/utils/format/curency';
import { injectIntl } from 'react-intl';
import styles from './styles.scss';
import { ORDER_TYPE } from '../../../constant';

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
    const { currencyByLocal } = this.props;
    if (!crypto?.id) return;
    this.props.coinGetBuyPrice({params: {
      currency: crypto?.id,
      amount: 1,
      fiat_currency: currencyByLocal,
      type: ORDER_TYPE.bank,
      level: 1,
    }});
    this.props.coinGetSellPrice({params: {
      currency: crypto?.id,
      amount: 1,
      fiat_currency: currencyByLocal,
      type: ORDER_TYPE.bank,
      level: 1,
    }});
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
        <div className={styles.coinInfo}>
          <div className={styles.label}>
            <img src={logo} alt="" />
            <span>{name}</span>
          </div>
          <div>
            diagram
          </div>
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
  country: state.app.ipInfo.country || 'HK',
  currencyByLocal: state.app.ipInfo.currency || 'HKD',
  sellPrice: state.screenCoinReducer.sellPrice[props?.crypto?.id],
  buyPrice: state.screenCoinReducer.buyPrice[props?.crypto?.id],
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
