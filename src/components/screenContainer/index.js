import React, { PureComponent } from 'react';
import detectWindow from 'src/screens/app/components/Layout/styles.scss';
import animations from 'src/assets/styles/animations';
import cx from 'classnames';
import Header from './header';
import HeaderMobile from './header/mobile';
// import Footer from './footer';
import styles from './styles.scss';

class ScreenContainer extends PureComponent {
  render() {
    const { children } = this.props;
    console.log('======props', this.props);
    return (
      <React.Fragment>
        <div className={detectWindow.desktop}>
          <Header />
        </div>
        <div className={detectWindow.mobile}>
          {/* <HeaderMobile /> */}
          <div><HeaderMobile /></div>
        </div>
        <div className={cx(styles.body, animations.fadeIn)}>
          { children }
        </div>
        {/* <Footer /> */}
      </React.Fragment>
    );
  }
}

export default ScreenContainer;
