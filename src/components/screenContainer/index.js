import React, { PureComponent } from 'react';
import Header from './header';
import Footer from './footer';

class ScreenContainer extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <Header />
        { this.props.children }
        <Footer />
      </React.Fragment>
    );
  }
}

export default ScreenContainer;
