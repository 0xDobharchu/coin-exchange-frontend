import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { coinGetSellPrice, coinGetBuyPrice } from 'src/screens/coin/action';
import { connect } from 'react-redux';
import { formatMoneyByLocale } from 'src/utils/format/curency';
import { injectIntl } from 'react-intl';
import styles from './styles.scss';
import { ORDER_TYPE } from '../../../constant';
import CryptoGraph from '@/screens/coin/components/pricePanel/cryptoGraph';
import MyMessage from '@/lang/components/MyMessage';

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

  componentDidUpdate(prevProps) {
    if (prevProps.currencyByLocal !== this.props.currencyByLocal) {
      this.getPrice();
    }
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
    if (!crypto?.id || !currencyByLocal) return;
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
          <div><CryptoGraph crypto={crypto} /></div>
        </div>
        {buyPrice && (
          <div className={styles.buy}>
            <span><MyMessage id="pricePanel.buy" /></span>
            <span>{buyPriceStr}</span>
          </div>
        )}
        {sellPrice && (
          <div className={styles.sell}>
            <span><MyMessage id="pricePanel.sell" /></span>
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
  country: state.app?.userCountry,
  currencyByLocal: state.app?.supportedCurrency[0],
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
