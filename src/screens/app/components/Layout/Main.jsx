import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { URL } from 'src/constants';
import BrowserDetect from 'src/services/browser-detect';
import { updateModal } from 'src/screens/app/redux/action';
// components
import HeaderBar from 'src/modules/HeaderBar/HeaderBar';
import MainHeader from 'src/components/Header/MainHeader';
import Navigation from 'src/components/core/controls/Navigation';
import Alert from 'src/components/core/presentation/Alert';
import Loading from 'src/components/core/controls/Loading';
import WalletPasscode from 'src/components/Wallet/WalletPasscode';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import QRCodeScan from 'src/components/Wallet/QRCodeScan/QRCodeScan';

class MainLayout extends React.Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    location: PropTypes.object.isRequired,
    app: PropTypes.object.isRequired,
  }

  // eslint-disable-next-line
  handleToggleModal = () => this.props.updateModal({ show: false });

  renderHeaderBar = () => {
    const { isDesktop } = BrowserDetect;
    const headerBarProps = {
      className: 'HeaderBarContainer',
      titleBar: 'Prediction',
    };
    if (isDesktop) return null;
    return (
      <HeaderBar {...headerBarProps} />
    );
  }

  renderNavigation = (props) => {
    const { isDesktop } = BrowserDetect;
    const { name } = (window.name !== '' && JSON.parse(window.name));
    if (isDesktop || name || (props.location.pathname === URL.PEX_EXTENSION)) return null;
    return (
      <Navigation location={props.location} />
    );
  }

  render() {
    const { isDesktop } = BrowserDetect.isDesktop;
    const {
      modal: {
        className, show, body, title, centered
      },
      children,
      showHeader
    } = this.props;
    return (
      <div className={`${isDesktop ? '' : 'app'} ${showHeader ? 'show-header' : 'hide-header'}`}>
        {(window.self !== window.top) && this.renderHeaderBar()}
        <MainHeader />
        <div className="content">
          {children}
        </div>
        {this.renderNavigation(this.props)}
        <Alert />
        <Loading />
        <WalletPasscode />
        <QRCodeScan />
        <Modal isOpen={show} toggle={this.handleToggleModal} className={className} centered={centered}>
          {title && <ModalHeader toggle={this.handleToggleModal}>{title}</ModalHeader>}
          <ModalBody>
            {body}
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapState = state => ({
  showHeader: state.app?.showHeader || false,
  modal: state.app.modal,
});

const mapDispatch = ({
  updateModal
});

export default connect(mapState, mapDispatch)(MainLayout);
