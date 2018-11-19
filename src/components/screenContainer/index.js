import React, { PureComponent } from 'react';
import Header from './header';
// import Footer from './footer';
import styles from './styles.scss';

class ScreenContainer extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <Header />
        <div className={styles.body}>
          { this.props.children }
        </div>
        {/* <Footer /> */}
      </React.Fragment>
    );
  }
}

export default ScreenContainer;
