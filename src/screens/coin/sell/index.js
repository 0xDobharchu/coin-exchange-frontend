import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Field, formValueSelector } from 'redux-form';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import createForm from 'src/components/core/form/createForm';
import { bindActionCreators } from 'redux';
import { PAYMENT_METHOD, EXCHANGE_DIRECTION } from 'src/screens/coin/constant';
import cx from 'classnames';
import { URL } from 'src/resources/constants/url';
import ConfirmButton from 'src/components/confirmButton';
import { showAlert } from 'src/screens/app/redux/action';
import reqErrorAlert from 'src/utils/errorHandler/reqErrorAlert';
import LabelLang from 'src/lang/components/LabelLang';
import { FaLock } from 'react-icons/fa';
import { updateProfileAction } from 'src/screens/auth/redux/action';
import authUtil from 'src/utils/authentication';
import OrderInfo from './components/orderInfo';
import BankInfo from './components/bankInfo';
import BankInfoFieldSet from './components/bankInfoFieldSet';
import TNG from './components/tng';
import exchangeField, { exchangeValidator } from './reduxFormFields/exchange';
import paymentMethodField from './reduxFormFields/paymentMethod';
import { makeOrder, genAddress } from './redux/action';
import CodFieldSet from '../components/codFieldSet';
import styles from './styles.scss';

const getIntlKey = (name) => `coin.sell.${name}`;
const sellFormName = 'SellForm';
const SellForm = createForm({
  propsReduxForm: {
    form: sellFormName,
    initialValues: {
      paymentMethod: PAYMENT_METHOD.TRANSFER,
    },
  },
});
const formSelector = formValueSelector(sellFormName);

class SellCryptoCoin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      walletAddress: null,
      isAuth: authUtil.isLogin() || false,
      verifiedPhone: null,
    };
  }

  isValidToSubmit = () => {
    const { isAuth, verifiedPhone } = this.state;
    if (!isAuth) return false;
    
    const {
      exchange: { amount, fiatAmount },
      bankName,
      bankAccountName,
      bankAccountNumber,
      paymentMethod,
      bankInfo,
      userAddress,
      userPhone,
      userNote
    } = this.props;
    if (amount && fiatAmount) {
      if (paymentMethod === PAYMENT_METHOD.TRANSFER && (bankInfo || (bankName && bankAccountName && bankAccountNumber))) {
        return true;
      } else if (paymentMethod === PAYMENT_METHOD.TNG && verifiedPhone) {
        return true;
      } else if (paymentMethod === PAYMENT_METHOD.COD && userAddress?.isValid && userPhone && userNote) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  genAddress = (currency) => {
    const { genAddress } = this.props;
    return genAddress(currency).then(walletAddress => {
      this.setState({ walletAddress });
      return walletAddress;
    }).catch(reqErrorAlert);
  }

  // need to save user payment info (if needed) and gen a coinbowl address
  prepareToOrder = async () => {
    const { showAlert } = this.props;
    try {
      const {exchange: { currency }, updateProfileAction, bankName, bankAccountName, bankAccountNumber, bankInfo } = this.props;

      // save user payment method for later use
      !bankInfo && await updateProfileAction({ payment_info: JSON.stringify({ bankName, bankAccountName, bankAccountNumber })})
        .catch((e) => {
          showAlert({
            message: <LabelLang id={getIntlKey('addPaymentInfoFailed')} />,
            type: 'danger'
          });
          throw e;
        });
      this.genAddress(currency);
    } catch(e) {
      showAlert({
        message: <LabelLang id={getIntlKey('prepareOrderFailed')} />,
        type: 'danger'
      });
    }
  }

  makeOrder = () => {
    const {
      makeOrder,
      exchange,
      bankName,
      bankAccountName,
      bankAccountNumber,
      paymentMethod,
      userAddress,
      userPhone,
      userNote
    } = this.props;
    const { walletAddress, verifiedPhone } = this.state;
    const orderType = this.getOrderType();
    const payload = {
      amount: String(exchange?.amount),
      currency: exchange?.currency,
      fiat_local_amount: String(exchange?.fiatAmount),
      fiat_local_currency: exchange?.fiatCurrency,
      direction: EXCHANGE_DIRECTION.sell,
      address: walletAddress,
      order_user_payment_type: orderType,
      order_type: orderType,
    };

    if (paymentMethod === PAYMENT_METHOD.TRANSFER) {
      payload.user_info = JSON.stringify({ bankName, bankAccountName, bankAccountNumber });
    }

    if (paymentMethod === PAYMENT_METHOD.TNG) {
      payload.user_info = JSON.stringify({ bankUserPhoneNumber: verifiedPhone });
    }

    if (paymentMethod === PAYMENT_METHOD.COD) {
      // order_user_payment_type only avaiable on bank type
      payload.order_user_payment_type = '';
      
      payload.user_info = JSON.stringify({ userAddressName: userAddress?.value?.name, userAddress: userAddress?.value?.address, userPhone, userNote });
    }

    makeOrder(payload)
      .then(this.orderSuccessHandler)
      .catch(this.orderFailedHandler);
  }

  orderSuccessHandler = (/* orderInfo */) => {
    const { showAlert, history } = this.props;
    showAlert({
      message: <LabelLang id={getIntlKey('orderSuccessful')} />,
      timeOut: 1000,
    });
    history.push(URL.ME_HISTORY);
  }

  orderFailedHandler = () => {
    const { showAlert } = this.props;
    showAlert({
      message: <LabelLang id={getIntlKey('orderFailed')} />,
      type: 'danger',
      timeOut: 1000,
    });
  }

  getOrderType = () => {
    // order_type: bank|tng => bank, tng => tng
    const { paymentMethod } = this.props;
    return [PAYMENT_METHOD.TRANSFER, PAYMENT_METHOD.TNG].includes(paymentMethod) ? PAYMENT_METHOD.TRANSFER : paymentMethod;
  }

  resetState = () => {
    this.setState({
      walletAddress: null
    });
  }

  onBankTransferDone = () => {
    this.resetState();
  }

  onTngVerified = (verifiedPhone) => {
    this.setState({ verifiedPhone });
  }

  renderBankInfo = () => {
    const { bankInfo, intl, paymentMethod } = this.props;
    return (
      <div className={cx(styles.bankInfo, paymentMethod === PAYMENT_METHOD.TRANSFER ? cx('mt-4', styles.showBank) : styles.hideBank)}>
        { bankInfo ? <BankInfo bankInfo={bankInfo} /> : <BankInfoFieldSet show={paymentMethod === PAYMENT_METHOD.TRANSFER} intl={intl} />}
      </div>
    );
  }

  render() {
    const { supportedCurrency, exchange, paymentMethod, intl } = this.props;
    const { walletAddress, isAuth } = this.state;
    const isValid = this.isValidToSubmit();
    const orderType = this.getOrderType();
    const exchangeInfo = {
      amount: exchange?.amount,
      currency: exchange?.currency,
      fiatAmount: exchange?.fiatAmount,
      fiatCurrency: exchange?.fiatCurrency,
    };

    return (
      <div className={styles.container}>
        <OrderInfo
          className={cx(styles.orderInfo, walletAddress ? styles.showOrderInfo : styles.hideOrderInfo)}
          generatedAddress={walletAddress}
          orderInfo={exchangeInfo}
          onMakeOrder={this.makeOrder}
        />
        <SellForm className={cx(styles.form, walletAddress ? styles.hideForm : styles.showForm)}>
          <Field
            name="exchange"
            component={exchangeField}
            direction={EXCHANGE_DIRECTION.sell}
            fiatCurrency={supportedCurrency[0]}
            validate={exchangeValidator}
            orderType={orderType}
            intl={intl}
          />
          <Field
            name="paymentMethod"
            className='mt-4'
            component={paymentMethodField}
            intl={intl}
          />
          { this.renderBankInfo() }
          { isAuth && <TNG show={paymentMethod === PAYMENT_METHOD.TNG} onTngVerified={this.onTngVerified} className='mt-4' /> }
          <CodFieldSet show={paymentMethod === PAYMENT_METHOD.COD} intl={intl} className='mt-4' />
          <ConfirmButton
            disabled={!isValid}
            containerClassName='mt-5'
            buttonClassName={styles.submitBtn}
            message={<LabelLang id={getIntlKey('confirmMsg')} values={{ amount: exchange?.amount || 0, currency: exchange?.currency }} />}
            label={(
              <span>
                <FaLock /> <LabelLang id={getIntlKey('sellBtn')} values={{ amount: exchange?.amount || 0, currency: exchange?.currency }} />
              </span>
            )}
            onConfirm={this.prepareToOrder}
          />
        </SellForm>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let bankInfo = state?.auth?.profile?.payment_info || {};
  const bankValues = Object.values(bankInfo);
  const bankName = formSelector(state, 'bankName');
  if (bankValues.length === 0 || !bankValues?.every(value => !!value)) {
    bankInfo = null;
  }

  return {
    paymentMethod: formSelector(state, 'paymentMethod'),
    exchange: formSelector(state, 'exchange'),
    userAddress: formSelector(state, 'address'),
    userPhone: formSelector(state, 'phone'),
    userNote: formSelector(state, 'noteAndTime'),
    bankName: bankInfo?.bankName || bankName?.isValid ? bankName?.value : '',
    bankAccountNumber: bankInfo?.bankAccountNumber || formSelector(state, 'bankAccountNumber'),
    bankAccountName: bankInfo?.bankAccountName || formSelector(state, 'bankAccountName'),
    supportedCurrency: state?.app?.supportedCurrency || [],
    bankInfo
  };
};

const mapDispatchToProps = dispatch => ({
  makeOrder: bindActionCreators(makeOrder, dispatch),
  genAddress: bindActionCreators(genAddress, dispatch),
  showAlert: bindActionCreators(showAlert, dispatch),
  updateProfileAction: bindActionCreators(updateProfileAction, dispatch),
});

SellCryptoCoin.defaultProps = {
  exchange: {},
  paymentMethod: PAYMENT_METHOD.TRANSFER,
  makeOrder: null,
  showAlert: null,
  supportedCurrency: [],
  bankName: '',
  bankAccountName: '',
  bankAccountNumber: '',
  userAddress: {},
  userNote: '',
  userPhone: '',
  bankInfo: null
};

SellCryptoCoin.propTypes = {
  exchange: PropTypes.object,
  bankInfo: PropTypes.object,
  paymentMethod: PropTypes.string,
  makeOrder: PropTypes.func,
  showAlert: PropTypes.func,
  supportedCurrency: PropTypes.array,
  genAddress: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  bankName: PropTypes.string,
  bankAccountName: PropTypes.string,
  bankAccountNumber: PropTypes.string,
  userAddress: PropTypes.object,
  userNote: PropTypes.string,
  userPhone: PropTypes.string,
};

export default withRouter(injectIntl(connect(mapStateToProps, mapDispatchToProps)(SellCryptoCoin)));
