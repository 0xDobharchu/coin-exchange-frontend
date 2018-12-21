import React, { Component } from 'react';
import PropTypes from 'prop-types';
import btcIcon from 'src/assets/icons/coin/btc.svg';
import ethIcon from 'src/assets/icons/coin/eth.svg';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { CRYPTO_CURRENCY, CRYPTO_CURRENCY_FULLNAME } from 'src/resources/constants/crypto';
import CryptoPrice from './cryptoPrice';
import styles from './styles.scss';

const CRYPTOS = [
  {
    id: CRYPTO_CURRENCY.BTC,
    name: CRYPTO_CURRENCY_FULLNAME[CRYPTO_CURRENCY.BTC],
    logo: btcIcon,
  },
  {
    id: CRYPTO_CURRENCY.ETH,
    name: CRYPTO_CURRENCY_FULLNAME[CRYPTO_CURRENCY.ETH],
    logo: ethIcon,
  },
];


class PricePanel extends Component {
  renderList = () => {
    const { supportedCryptoCurrencies } = this.props;
    return CRYPTOS.map(crypto => supportedCryptoCurrencies.includes(crypto.id) ? <CryptoPrice key={crypto?.id} crypto={crypto} /> : null);
  };

  render() {
    return (
      <div className={styles.container}>
        {this.renderList()}
      </div>
    );
  }
}

const mapState = state => ({
  supportedCryptoCurrencies: state?.app?.supportedCryptoCurrencies
});

PricePanel.defaultProps = {
  supportedCryptoCurrencies: [],
};

PricePanel.propTypes = {
  supportedCryptoCurrencies: PropTypes.array,
};

export default injectIntl(connect(mapState)(PricePanel));
