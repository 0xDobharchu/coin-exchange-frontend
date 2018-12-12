import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import detectWindow from 'src/screens/app/components/Layout/styles.scss';
import animations from 'src/assets/styles/animations';
import cx from 'classnames';
import Header from './header';
import HeaderMobile from './header/mobile';
import Footer from './footer';
import styles from './styles.scss';

class ScreenContainer extends PureComponent {

  renderHeader = () => {
    const { header } = this.props;
    return (
      <React.Fragment>
        <div className={detectWindow.desktop}>
          <Header {...typeof header ==='object' ? header : {}} />
        </div>
        <div className={detectWindow.mobile}>
          <div><HeaderMobile {...typeof header ==='object' ? header : {}} /></div>
        </div>
      </React.Fragment>
    );
  }

  renderBodyWithWrapper = () => {
    const { children } = this.props;
    return (
      <div className={cx(styles.body, animations.fadeIn)}>
        { children }
      </div>
    );
  }

  renderFooter = () => {
    const { footer } = this.props;
    return (
      <Footer {...typeof footer ==='object' ? footer : {}} />
    );
  }
  render() {
    const { children, header, bodyWrapper, footer, noContainer } = this.props;
    if (noContainer) {
      return children;
    }
    return (
      <React.Fragment>
        {header && this.renderHeader()}
        {bodyWrapper ? this.renderBodyWithWrapper() : children}
        {footer && this.renderFooter()}
      </React.Fragment>
    );
  }
}

ScreenContainer.defaultProps = {
  footer: true,
  header: true,
  bodyWrapper: true,
  noContainer: false
};

ScreenContainer.propTypes = {
  header: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]),
  footer: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]),
  bodyWrapper: PropTypes.bool,
  noContainer: PropTypes.bool,
  children: PropTypes.node.isRequired
};

export default ScreenContainer;
