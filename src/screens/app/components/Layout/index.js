import React, { PureComponent } from 'react';
import cx from 'classnames';
import Alert from '@/components/core/presentation/Alert';
import Navigation from '@/components/core/controls/Navigation';
import styles from './styles.scss';
import BrowserDetect from '@/services/browser-detect';
import WalletPasscode from '@/components/Wallet/WalletPasscode';

class Layout extends PureComponent {
  renderNavigation = (props) => {
    if (__CLIENT__){
      const { isDesktop } = BrowserDetect;    
      const { name } = (window.name !== '' && JSON.parse(window.name));
      if (isDesktop || name) return null;
      return (
        <Navigation location={props.location} />
      );
    }
    return '';
    
  }

  render() {
    console.log('Layout', this.props);
    return (
      <React.Fragment>
        <div className={cx('common-fluid', styles.content)}>
          {this.props.children}
        </div>
        {this.renderNavigation(this.props)}
        <Alert />
        <WalletPasscode />
      </React.Fragment>
    );
  }
}

export default Layout;
