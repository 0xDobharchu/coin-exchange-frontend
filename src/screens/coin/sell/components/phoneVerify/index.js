import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updatePhoneNumberAction, submitPhoneCodeAction } from 'src/screens/auth/redux/action';
import { showAlert } from 'src/screens/app/redux/action';
import ClockCount from 'src/components/clockCount';
import LabelLang from 'src/lang/components/LabelLang';
import { DEFAULT_COUNTRY } from 'src/resources/constants/countries';
import { injectIntl } from 'react-intl';
import { FaCheck } from 'react-icons/fa';
import styles from './styles.scss';

const getIntlKey = (name) => `coin.components.phoneVerify.${name}`;

class PhoneVerify extends Component {
  constructor() {
    super();
    this.state = {
      PhoneInput: null,
      phone: null,
      code: null,
      isWaitingCode: false,
      verified: false,
      isLocking: false,
    };
  }

  componentDidMount() {
    import('react-phone-input-2').then(com => this.setState({ PhoneInput: com?.default }));
    
    const { verifiedPhone, pendingPhone } = this.props;
    this.onPhoneChange(verifiedPhone || pendingPhone);
    if (verifiedPhone) {
      this.handleCallbackData(verifiedPhone);
    }
  }

  componentDidUpdate(prevProps) {
    const { verifiedPhone, pendingPhone } = this.props;

    if (prevProps.verifiedPhone !== verifiedPhone || prevProps.pendingPhone !== pendingPhone) {
      if (verifiedPhone) {
        this.handleCallbackData(verifiedPhone);
      }
      this.onPhoneChange(verifiedPhone || pendingPhone);
    }
  }

  handleCallbackData = (phone = this.state.phone) => {
    const { onVerified } = this.props;
    if (typeof onVerified === 'function') {
      onVerified(phone);
    }
  }

  onPhoneChange = (phone) => {
    this.setState({ phone });
  }

  onCodeChange = ({ target }) => {
    const value = target?.value;
    this.setState({ code: value });
  }

  onSubmitPhone = () => {
    const { updatePhoneNumberAction } = this.props;
    const { phone } = this.state;
    this.setState({ isWaitingCode: true, isLocking: true });
    updatePhoneNumberAction(phone).then(() => {
      const { showAlert } = this.props;
      showAlert({
        message: <LabelLang id={getIntlKey('submitPhoneSuccessMsg')} />,
        type: 'success'
      });
    }).catch(() => {
      const { showAlert } = this.props;
      showAlert({
        message: <LabelLang id={getIntlKey('submitPhoneFailedMsg')} />,
        type: 'danger'
      });
    });
  }

  onSubmitCode = () => {
    const { submitPhoneCodeAction } = this.props;
    const { code } = this.state;
    submitPhoneCodeAction(code).then(() => {
      const { showAlert } = this.props;
      showAlert({
        message: <LabelLang id={getIntlKey('submitCodeSuccessMsg')} />,
        type: 'success'
      });
      this.handleCallbackData();
      this.setState({ isWaitingCode: false, verified: true });
    }).catch(() => {
      const { showAlert } = this.props;
      showAlert({
        message: <LabelLang id={getIntlKey('submitCodeFailedMsg')} />,
        type: 'danger'
      });
    });
  }

  renderClock = () => {
    return (
      <ClockCount
        className={styles.prependPhone}
        duration={60}
        startAt={new Date()}
        onExpired={() => {
          this.setState({ isLocking: false });
        }}
      />
    );
  }

  render() {
    const { PhoneInput, phone, isLocking, isWaitingCode, code, verified } = this.state;
    const { verifiedPhone } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.phoneGroup}>
          {PhoneInput && (
            <PhoneInput
              defaultCountry={DEFAULT_COUNTRY.toLowerCase()}
              regions='asia'
              onChange={this.onPhoneChange}
              value={phone}
              disabled={!!verifiedPhone}
            />)
          }
          { !verifiedPhone && !verified && !isLocking && <button type='button' onClick={this.onSubmitPhone}><LabelLang id={getIntlKey('submitPhone')} /></button> }
          { isWaitingCode && isLocking && this.renderClock() }
          { verified || !!verifiedPhone && (
            <div className={styles.prependPhone}>
              <FaCheck color='green' />
            </div>
          ) }
        </div>
        {
          isWaitingCode && ( 
            <div className={styles.codeGroup}>
              <input
                className={styles.code}
                name="verify-code"
                onChange={this.onCodeChange}
                value={code || ''}
                type="number"
                placeholder={this.props.intl?.formatMessage({ id: getIntlKey('verifyCode') })}
              />
              <button className={styles.btnCode} type='button' onClick={this.onSubmitCode}><LabelLang id={getIntlKey('submitCode')} /></button>
            </div>
          )
        }
      </div>
    );
  }
}

const mapDispatch = {
  updatePhoneNumberAction,
  submitPhoneCodeAction,
  showAlert
};

const mapState = state => ({
  verifiedPhone: state.auth.profile?.phone_number || null,
  pendingPhone: state.auth.profile?.pending_phone_number || null,
});

export default injectIntl(connect(mapState, mapDispatch)(PhoneVerify));