import React from 'react';
import styles from './styles.scss';
import { CRYPTO_CURRENCY } from '@/resources/constants/crypto';

const CRYPTOS = {
  [CRYPTO_CURRENCY.BTC]: {
    id: CRYPTO_CURRENCY.BTC,
    logo: 'https://s2.coinmarketcap.com/generated/sparklines/web/7d/usd/1.png',
  },
  [CRYPTO_CURRENCY.ETH]: {
    id: CRYPTO_CURRENCY.ETH,
    logo: 'https://s2.coinmarketcap.com/generated/sparklines/web/7d/usd/1027.png',
  }
};

const CryptoGraph = ({ crypto }) => {
  const { logo } = CRYPTOS[crypto.id];

  return (
    <div className={styles.container}>
      <img className={styles.sparkline} alt="sparkline" src={logo} />
    </div>
  );
};

export default CryptoGraph;
