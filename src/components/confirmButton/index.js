import React, { PureComponent } from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import styles from './styles.scss';

class ConfirmButton extends PureComponent {
  constructor() {
    super();

    this.state = {
      showModal: false,
    };

    this.onClick = :: this.onClick;
    this.onCancel = :: this.onCancel;
    this.onConfirm = :: this.onConfirm;
    this.showModal = :: this.showModal;
  }

  showModal(show = true) {
    this.setState({ showModal: show });
  }

  onClick(e) {
    const { disabled, validate, onFirstClick } = this.props;
    e.preventDefault();
    if (typeof onFirstClick === 'function') {
      onFirstClick();
    }
    if (!disabled) {
      if (typeof validate === 'function') {
        if (validate()) {
          this.showModal();
        }
      } else {
        this.showModal();
      }
    }
  }

  onConfirm() {
    const { onConfirm } = this.props;
    if (typeof onConfirm === 'function') {
      onConfirm();
    }

    this.showModal(false);
  }

  onCancel(e) {
    e.preventDefault();
    const { onCancel } = this.props;
    if (typeof onCancel === 'function') {
      onCancel();
    }

    this.showModal(false);
  }

  render() {
    const { showModal } = this.state;
    const { disabled, message, confirmText, cancelText, onFirstClick, containerClassName, buttonClassName, label } = this.props;
    return (
      <div className={`${styles.container} ${containerClassName}`}>
        <button type="button" disabled={disabled && !onFirstClick} className={`btn btn-warning ${styles.confirmBtn} ${buttonClassName}`} onClick={this.onClick}>{label}</button>
        <Modal show={showModal} onHide={this.handleClose}>
          <Modal.Body>
            <div className={styles.content}>
              <span className={styles.desc}>{message || 'messages.create.atm.confirm_button.desc'}</span>
              <div className={styles.container}>
                <button type="button" onClick={this.onConfirm} className={styles.ok}>{confirmText || 'messages.create.atm.confirm_button.confirm'}</button>
                <button type="button" onClick={this.onCancel} className={styles.cancel}>{cancelText || 'messages.create.atm.confirm_button.cancel'}</button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

ConfirmButton.defaultProps = {
  onCancel: () => {},
  onConfirm: () => {},
  validate: null,
  onFirstClick: null,
  containerClassName: '',
  buttonClassName: '',
  message: null,
  confirmText: null,
  cancelText: null,
  disabled: false,
};

ConfirmButton.propTypes = {
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  validate: PropTypes.func,
  onFirstClick: PropTypes.func,
  buttonClassName: PropTypes.string,
  containerClassName: PropTypes.string,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  confirmText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  cancelText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  disabled: PropTypes.bool,
};

export default ConfirmButton;
