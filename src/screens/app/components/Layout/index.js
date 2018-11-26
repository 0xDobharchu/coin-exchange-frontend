import React, { PureComponent } from 'react';
import cx from 'classnames';
import Alert from '@/components/core/presentation/Alert';
import Navigation from '@/components/core/controls/Navigation';
import styles from './styles.scss';
import WalletPasscode from '@/components/Wallet/WalletPasscode';
import RequirePassword from '@/components/Wallet/RequirePassword';
// import Loading from '@/components/core/presentation/Loading';


class Layout extends PureComponent {

  render() {
    // eslint-disable-next-line
    const { children, location } = this.props;
    return (
      <React.Fragment>
        <div className={cx('common-fluid', styles.content)}>
          {children}
        </div>
        <div className={styles.mobile}>
          <Navigation location={location} />
        </div>
        {/* <Loading /> */}
        <Alert />
        <WalletPasscode />
        <RequirePassword />
      </React.Fragment>
    );
  }
}

export default Layout;
