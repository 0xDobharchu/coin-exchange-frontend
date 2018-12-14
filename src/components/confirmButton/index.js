import React, { PureComponent } from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import cx from 'classnames';
import LabelLang from 'src/lang/components/LabelLang';
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
        <button type="submit" disabled={disabled && !onFirstClick} className={cx(styles.confirmBtn, buttonClassName)} onClick={this.onClick}>{label}</button>
        <Modal show={showModal} backdrop='static' centered>
          <Modal.Body>
            <div className={styles.content}>
              <span className={styles.desc}>{message}</span>
              <div>
                <button type="submit" onClick={this.onConfirm} className={cx(styles.button, styles.ok)}>{confirmText}</button>
                <button type="button" onClick={this.onCancel} className={cx(styles.button, styles.cancel)}>{cancelText}</button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

ConfirmButton.defaultProps = {
  onCancel: null,
  onConfirm: null,
  validate: null,
  onFirstClick: null,
  containerClassName: '',
  buttonClassName: '',
  message: <LabelLang id='components.confirmBtn.defaultMsg' />,
  confirmText: <LabelLang id='components.confirmBtn.defaultConfirmText' />,
  cancelText: <LabelLang id='components.confirmBtn.defaultDeclineText' />,
  label: <LabelLang id='components.confirmBtn.defaultLabelText' />,
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
  ]),
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
