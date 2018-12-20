import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import LabelLang from 'src/lang/components/LabelLang';
import { injectIntl, intlShape } from 'react-intl';
import { registerService as registerPwaService, addToHome } from 'src/services/pwa/addToHome';
import styles from './styles.scss';

class PwaInstallRequest extends Component {
  constructor() {
    super();
    this.state = { showPwaDialog: false };
    this.confirmDialog = React.createRef();
  }

  componentDidMount() {
    // listen "Add to home screen" event
    registerPwaService().then(e => {
      if (e) this.setState({ showPwaDialog: true });
    });
  }

  hide = () => {
    this.setState({ showPwaDialog: false });
  }

  addHandler = () => {
    const { intl } = this.props;
    this.hide();
    addToHome().then(rs => alert(intl.formatMessage({ id: rs ? 'pwaInstallRequest.added' : 'pwaInstallRequest.addFailed' })));
  }

  render() {
    const { showPwaDialog } = this.state;
    return (
      <Modal show={showPwaDialog} dialogClassName={styles.container} onHide={this.hide}>
        <Modal.Body>
          <LabelLang id='pwaInstallRequest.msg' />
        </Modal.Body>

        <Modal.Footer>
          <button type="button" onClick={this.addHandler}><LabelLang id='pwaInstallRequest.yesBtn' /></button>
          <button className={styles.laterBtn} type="button" onClick={this.hide}><LabelLang id='pwaInstallRequest.noBtn' /></button>
        </Modal.Footer>
      </Modal>
    );
  }
}

PwaInstallRequest.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(PwaInstallRequest);