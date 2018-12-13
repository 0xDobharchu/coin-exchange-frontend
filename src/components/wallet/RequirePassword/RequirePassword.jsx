import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { connect } from "react-redux";

import InputMobile from '../InputMobile'

import Button from 'src/components/core/controls/Button';

import { Modal } from 'react-bootstrap';

import style from './RequirePassword.scss';
import { hideRequirePassword } from 'src/screens/app/redux/action';

import verifyPassword from './action';
import LabelLang from 'src/lang/components/LabelLang';

import LogManager from 'src/services/logs/logmanage';

class RequirePassword extends React.Component {

  static propTypes = {
    app: PropTypes.object,
    onFinish: PropTypes.func,
    intl: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);


    this.state = {
      isShowPassword: false,
      password: '',
      onFinish: null,
      isLoading: false,
      isFail: false,
    }
  }


  componentWillReceiveProps(nextProps) {
    let props = nextProps.app.passwordData || {};
    if (props.isShow)
      this.setState({ isShowPassword: true, onFinish: props.onFinish })
    else {
      this.setState({ password: '' });
    }
  }

  componentDidMount() {

  }

  onVerifyPasswordClick = () => {
    
    this.setState({isLoading: true})
    this.props.verifyPassword(this.state.password).then((result) => {      
      if (result === true) {
        this.onFinish();
      }
      else {
        this.setState({password: '', isFail: true});
        // save event:
        LogManager.saveLog(
          LogManager.PAGE_EVENT.wallet.requirePassword.name, 
          LogManager.PAGE_EVENT.wallet.requirePassword.event.requirePasswordFail,      
        );
      }

    }).finally(() => {
      this.setState({isLoading: false})
    });
  }

  onFinish = () => {
    const { onFinish } = this.state;

    if (onFinish) {
      onFinish(this.state.password);
      this.onClose();
    }
    else {

    }
    // save event:
    LogManager.saveLog(
      LogManager.PAGE_EVENT.wallet.requirePassword.name, 
      LogManager.PAGE_EVENT.wallet.requirePassword.event.requirePasswordPass,
    );
  }

  onClose = () => {
    this.setState({ isShowPassword: false, password: '' }, () => {
      this.props.hideRequirePassword();
    });
  }

  onPasswordChange = (e) => {
    let password = e.target.value;
    this.setState({ password, isFail: false })
  }
  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.onVerifyPasswordClick();
    }
  }

  render() {

    const { messages } = this.props.intl;

    return (
      <Modal
        show={this.state.isShowPassword}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={this.onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{messages['requirePassword.title']}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p>{messages['requirePassword.description']}</p>
            <InputMobile type="password" onKeyPress={this._handleKeyPress} value={this.state.password} placeholder={messages['user.login.password']} onChange={(evt) => { this.onPasswordChange(evt) }} />

            {this.state.isFail && <small className="text-danger error"> <LabelLang id='requirePassword.passNotMatch' /> </small>}

            <Button isLoading={this.state.isLoading} disabled={this.state.password.trim().length < 8} className={"btn-block " + style.buttonUnlock} variant="primary" onClick={this.onVerifyPasswordClick}>{messages['requirePassword.btnUnlockText']}</Button>

          </div>
        </Modal.Body>
      </Modal>
    )
  }
}

const mapState = state => ({
  app: state.app,
});

const mapDispatch = ({
  hideRequirePassword,
  verifyPassword,  
});

export default injectIntl(connect(mapState, mapDispatch)(RequirePassword));