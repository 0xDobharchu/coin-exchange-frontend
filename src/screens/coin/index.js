import React from 'react';
import MainLayout from 'src/components/dump';
import CoinDesktop from './desktopLayout';
import styles from './styles.scss';

const Coin = () => (
  <React.Fragment>
    <div className={styles.desktop}>
      <CoinDesktop>
        <MainLayout />
      </CoinDesktop>
    </div>
    <div className={styles.mobile}>
      <MainLayout />
    </div>
  </React.Fragment>
);

export default Coin;
