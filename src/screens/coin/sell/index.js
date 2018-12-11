import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Field, formValueSelector, isValid } from 'redux-form';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import createForm from 'src/components/core/form/createForm';
import { bindActionCreators } from 'redux';
import { PAYMENT_METHOD, EXCHANGE_DIRECTION } from 'src/screens/coin/constant';
import cx from 'classnames';
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
import { genAddress, addPendingOrder, clearPendingOrder } from './redux/action';
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
      isAuth: authUtil.isLogin() || false,
      verifiedPhone: null,
    };
  }

  isValidToSubmit = () => {
    const { isAuth, verifiedPhone } = this.state;
    const { isFormValid } = this.props;
    if (!isAuth) return false;
    if (!isFormValid) return false;
    
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
      const genAddr = await this.genAddress(currency);
      if (genAddr) {
        // save order info to redux store
        this.addPendingOrder();
      }
    } catch(e) {
      showAlert({
        message: <LabelLang id={getIntlKey('prepareOrderFailed')} />,
        type: 'danger'
      });
    }
  }

  addPendingOrder = () => {
    const {
      exchange,
      bankName,
      bankAccountName,
      bankAccountNumber,
      paymentMethod,
      userAddress,
      userPhone,
      userNote,
      addPendingOrder
    } = this.props;
    const { verifiedPhone } = this.state;
    const orderType = this.getOrderType();
    const data = {
      exchangeData: exchange,
      orderUserPaymentType: orderType,
      orderType
    };

    if (paymentMethod === PAYMENT_METHOD.TRANSFER) {
      data.userInfo = { bankName, bankAccountName, bankAccountNumber };
    }

    if (paymentMethod === PAYMENT_METHOD.TNG) {
      data.userInfo = { bankUserPhoneNumber: verifiedPhone };
    }

    if (paymentMethod === PAYMENT_METHOD.COD) {
      // order_user_payment_type only avaiable on bank type
      data.orderUserPaymentType = '';
      
      data.userInfo = { userAddressName: userAddress?.value?.name, userAddress: userAddress?.value?.address, userPhone, userNote };
    }

    addPendingOrder(data);
  }

  getOrderType = () => {
    // order_type: bank|tng => bank, tng => tng
    const { paymentMethod } = this.props;
    return [PAYMENT_METHOD.TRANSFER, PAYMENT_METHOD.TNG].includes(paymentMethod) ? PAYMENT_METHOD.TRANSFER : paymentMethod;
  }

  onTngVerified = (verifiedPhone) => {
    this.setState({ verifiedPhone });
  }

  onFinishOrder = () => {
    const { clearPendingOrder } = this.props;
    clearPendingOrder();
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
    const { supportedCurrency, exchange, paymentMethod, intl, pendingOrder } = this.props;
    const { isAuth } = this.state;
    const isValid = this.isValidToSubmit();
    const orderType = this.getOrderType();

    if (pendingOrder) {
      return (
        <OrderInfo
          className={styles.orderInfo}
          onFinishOrder={this.onFinishOrder}
        />
      );
    }

    return (
      <div className={styles.container}>
        <SellForm className={styles.form}>
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

const mapStateToProps = (state, props) => {
  let bankInfo = state?.auth?.profile?.payment_info || {};
  const bankValues = Object.values(bankInfo)?.map((value = '') => value?.trim());
  const bankName = formSelector(state, 'bankName');

  if (bankValues.length === 0 || !bankValues?.every(value => !!value)) {
    bankInfo = null;
  }

  return {
    isFormValid: isValid(sellFormName)(state),
    paymentMethod: formSelector(state, 'paymentMethod'),
    exchange: formSelector(state, 'exchange'),
    userAddress: formSelector(state, 'address'),
    userPhone: formSelector(state, 'phone'),
    userNote: formSelector(state, 'noteAndTime') || props.intl?.formatMessage({ id: 'coin.buy.userNote' }),
    bankName: bankInfo?.bankName || bankName?.isValid ? bankName?.value : '',
    bankAccountNumber: bankInfo?.bankAccountNumber || formSelector(state, 'bankAccountNumber'),
    bankAccountName: bankInfo?.bankAccountName || formSelector(state, 'bankAccountName'),
    supportedCurrency: state?.app?.supportedCurrency || [],
    pendingOrder: state.sellCoinReducer.pendingOrder,
    bankInfo
  };
};

const mapDispatchToProps = dispatch => ({
  genAddress: bindActionCreators(genAddress, dispatch),
  showAlert: bindActionCreators(showAlert, dispatch),
  updateProfileAction: bindActionCreators(updateProfileAction, dispatch),
  addPendingOrder: bindActionCreators(addPendingOrder, dispatch),
  clearPendingOrder: bindActionCreators(clearPendingOrder, dispatch),
});

SellCryptoCoin.defaultProps = {
  exchange: {},
  paymentMethod: PAYMENT_METHOD.TRANSFER,
  showAlert: null,
  supportedCurrency: [],
  bankName: '',
  bankAccountName: '',
  bankAccountNumber: '',
  userAddress: {},
  userNote: '',
  userPhone: '',
  bankInfo: null,
  isFormValid: false,
  pendingOrder: null
};

SellCryptoCoin.propTypes = {
  exchange: PropTypes.object,
  bankInfo: PropTypes.object,
  paymentMethod: PropTypes.string,
  showAlert: PropTypes.func,
  supportedCurrency: PropTypes.array,
  genAddress: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  bankName: PropTypes.string,
  bankAccountName: PropTypes.string,
  bankAccountNumber: PropTypes.string,
  userAddress: PropTypes.object,
  userNote: PropTypes.string,
  userPhone: PropTypes.string,
  isFormValid: PropTypes.bool,
  addPendingOrder: PropTypes.func.isRequired,
  clearPendingOrder: PropTypes.func.isRequired,
  pendingOrder: PropTypes.object,
};

export default withRouter(injectIntl(connect(mapStateToProps, mapDispatchToProps)(SellCryptoCoin)));
