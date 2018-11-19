import React, { PureComponent } from 'react';
import cx from 'classnames';
import Alert from '../../../../components/core/presentation/Alert';
import Navigation from '../../../../components/core/controls/Navigation';
import styles from './styles.scss';

class Layout extends PureComponent {
  render() {
    console.log('Layout', this.props);
    return (
      <React.Fragment>
        <div className={cx('common-fluid', styles.content)}>
          {this.props.children}
        </div>
        <Navigation />
        <Alert />
      </React.Fragment>
    );
  }
}

export default Layout;
