import React, { PureComponent } from 'react';
import cx from 'classnames';
import Alert from '@/components/core/presentation/Alert';
import Navigation from '@/components/core/controls/Navigation';
import detectWindow from 'src/screens/coin/styles.scss';
import styles from './styles.scss';

class Layout extends PureComponent {

  render() {
    // eslint-disable-next-line
    const { children, location } = this.props;
    return (
      <React.Fragment>
        <div className={cx('common-fluid', styles.content)}>
          {children}
        </div>
        <div className={detectWindow.mobile}>
          <Navigation location={location} />
        </div>
        <Alert />
      </React.Fragment>
    );
  }
}

export default Layout;
