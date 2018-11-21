import React, { PureComponent } from 'react';
import detectWindow from 'src/screens/coin/styles.scss';
import Header from './header';
// import Footer from './footer';
import styles from './styles.scss';

class ScreenContainer extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <div className={detectWindow.desktop}>
          <Header />
        </div>
        <div className={styles.body}>
          { this.props.children }
        </div>
        {/* <Footer /> */}
      </React.Fragment>
    );
  }
}

export default ScreenContainer;
