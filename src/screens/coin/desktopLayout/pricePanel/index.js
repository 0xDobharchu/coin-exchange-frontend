import React, { Component } from 'react';
import btcIcon from 'src/assets/icons/coin/btc.svg';
import ethIcon from 'src/assets/icons/coin/eth.svg';
import { injectIntl } from 'react-intl';
import CryptoPrice from './cryptoPrice';
import styles from './styles.scss';

const CRYPTOS = [
  {
    id: 'BTC',
    name: 'Bitcoin',
    logo: btcIcon,
  },
  {
    id: 'ETH',
    name: 'Ethereum',
    logo: ethIcon,
  },
];


class PricePanel extends Component {
  renderList = () => CRYPTOS.map(crypto => <CryptoPrice key={crypto?.id} crypto={crypto} />);

  render() {
    return (
      <div className={styles.container}>
        <span className={styles.label}>Price</span>
        {this.renderList()}
      </div>
    );
  }
}

export default injectIntl(PricePanel);
