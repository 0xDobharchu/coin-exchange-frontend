import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { coinGetSellPrice, coinGetBuyPrice } from 'src/screens/coin/action';
import { connect } from 'react-redux';
import { formatMoneyByLocale } from 'src/utils/format/curency';
import { injectIntl } from 'react-intl';
import { EXCHANGE_ACTION } from 'src/resources/constants/exchange';
import CryptoGraph from 'src/screens/coin/components/pricePanel/cryptoGraph';
import LabelLang from 'src/lang/components/LabelLang';
import { ORDER_TYPE } from 'src/screens/coin/constant';
import styles from './styles.scss';

const getIntlKey = (name) => `coin.components.pricePanel.${name}`;

class CryptoPrice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      crypto: null,
      currencyByLocal: props.currencyByLocal
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (JSON.stringify(nextProps.crypto) !== JSON.stringify(prevState.crypto)) {
      return { crypto: nextProps.crypto };
    }

    if (prevState.currencyByLocal !== nextProps.currencyByLocal) {

      const { crypto } = prevState;
      const { currencyByLocal } = nextProps;

      if (crypto?.id && currencyByLocal) {
        nextProps.coinGetBuyPrice({params: {
          currency: crypto?.id,
          amount: 1,
          fiat_currency: currencyByLocal,
          type: ORDER_TYPE.bank,
          level: 1,
          direction: EXCHANGE_ACTION.BUY
        }});
        nextProps.coinGetSellPrice({params: {
          currency: crypto?.id,
          amount: 1,
          fiat_currency: currencyByLocal,
          type: ORDER_TYPE.bank,
          level: 1,
          direction: EXCHANGE_ACTION.SELL
        }});
      }

      return { currencyByLocal: nextProps.currencyByLocal };
    }

    return null;
  }

  componentDidMount() {
    this.getPrice();
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
      direction: EXCHANGE_ACTION.BUY
    }});
    this.props.coinGetSellPrice({params: {
      currency: crypto?.id,
      amount: 1,
      fiat_currency: currencyByLocal,
      type: ORDER_TYPE.bank,
      level: 1,
      direction: EXCHANGE_ACTION.SELL
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
          <div className={styles.graph}><CryptoGraph crypto={crypto} /></div>
        </div>
        {buyPrice && (
          <div className={styles.buy}>
            <span><LabelLang id={getIntlKey('buy')} /></span>
            <span>{buyPriceStr}</span>
          </div>
        )}
        {sellPrice && (
          <div className={styles.sell}>
            <span><LabelLang id={getIntlKey('sell')} /></span>
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
