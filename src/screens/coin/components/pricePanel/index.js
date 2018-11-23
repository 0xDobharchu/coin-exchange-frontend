import React, { Component } from 'react';
import btcIcon from 'src/assets/icons/coin/btc.svg';
import ethIcon from 'src/assets/icons/coin/eth.svg';
import { injectIntl } from 'react-intl';
import CryptoPrice from './cryptoPrice';
import styles from './styles.scss';
import { CRYPTO_CURRENCY, CRYPTO_CURRENCY_FULLNAME } from '@/resources/constants/crypto';

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
  renderList = () => CRYPTOS.map(crypto => <CryptoPrice key={crypto?.id} crypto={crypto} />);

  render() {
    return (
      <div className={styles.container}>
        {this.renderList()}
      </div>
    );
  }
}

export default injectIntl(PricePanel);
