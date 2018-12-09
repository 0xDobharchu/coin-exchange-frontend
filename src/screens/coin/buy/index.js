import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Field, formValueSelector } from 'redux-form';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import createForm from 'src/components/core/form/createForm';
import { bindActionCreators } from 'redux';
import { PAYMENT_METHOD, EXCHANGE_DIRECTION } from 'src/screens/coin/constant';
import { DEFAULT_CURRENCY } from 'src/resources/constants/crypto';
import { URL } from 'src/resources/constants/url';
import ConfirmButton from 'src/components/confirmButton';
import { showAlert } from 'src/screens/app/redux/action';
import LabelLang from 'src/lang/components/LabelLang';
import { FaLock } from 'react-icons/fa';
import reqErrorAlert from 'src/utils/errorHandler/reqErrorAlert';
import authUtil from 'src/utils/authentication';
import BankTransferInfo from './components/bankTransferInfo';
import walletSelectorField, { walletValidator } from './reduxFormFields/walletSelector';
import exchangeField, { exchangeValidator } from './reduxFormFields/exchange';
import paymentMethodField from './reduxFormFields/paymentMethod';
import { makeOrder } from './redux/action';
import CodFieldSet from '../components/codFieldSet';
import styles from './styles.scss';

const buyFormName = 'BuyForm';
const BuyForm = createForm({
  propsReduxForm: {
    form: buyFormName,
    initialValues: {
      paymentMethod: PAYMENT_METHOD.TRANSFER,
      wallet: {
        address: '',
        currency: DEFAULT_CURRENCY
      }
    },
  },
});
const formSelector = formValueSelector(buyFormName);

class BuyCryptoCoin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuth: authUtil.isLogin() || false,
      orderInfo: null,
      showBankTransferInfo: false,
    };
  }

  isValidToSubmit = () => {
    const { isAuth } = this.state;
    if (!isAuth) return false;
    const { wallet: { address, currency, invalidAddress }, exchange: { amount, fiatAmount }, paymentMethod } = this.props;
    if (address && currency && !invalidAddress && amount && fiatAmount) {
      if (paymentMethod === PAYMENT_METHOD.COD) {
        const { userAddress, userPhone, userNote } = this.props;
        if (userAddress?.isValid && userPhone && userNote) {
          return true;
        }
      } else {
        return true;
      }
    }
    return false;
  }

  makeOrder = () => {
    const { makeOrder, wallet, exchange, paymentMethod, userAddress, userPhone, userNote } = this.props;
    const payload = {
      amount: String(exchange?.amount),
      currency: exchange?.currency,
      fiat_local_amount: String(exchange?.fiatAmount),
      fiat_local_currency: exchange?.fiatCurrency,
      order_type: paymentMethod,
      direction: EXCHANGE_DIRECTION.buy,
      address: wallet?.address,
    };
    if (paymentMethod === PAYMENT_METHOD.COD) {
      payload.user_info = JSON.stringify({ userAddressName: userAddress?.value?.name, userAddress: userAddress?.value?.address, userPhone, userNote });
    }
    makeOrder(payload)
      .then(this.orderSuccessHandler)
      .catch(this.orderFailedHandler);
  }

  orderSuccessHandler = (orderInfo) => {
    this.setState({ orderInfo });
    const { showAlert, paymentMethod, history } = this.props;
    showAlert({
      message: <LabelLang id="coin.buy.orderSuccessMsg" />,
      timeOut: 1000,
    });
    if (paymentMethod === PAYMENT_METHOD.COD) {
      history?.push(URL.ME_HISTORY);
    } else {
      this.setState({ showBankTransferInfo: true });
    }
  }

  orderFailedHandler = (e) => {
    reqErrorAlert(e, { message: <LabelLang id="coin.buy.orderFailedMsg" /> });
  }

  resetState = () => {
    this.setState({
      showBankTransferInfo: false,
      orderInfo: null
    });
  }

  onBankTransferDone = () => {
    const { history } = this.props;
    history.push(URL.ME_HISTORY);
    this.resetState();
  }

  render() {
    const { paymentMethod, supportedCurrency, exchange, wallet, intl } = this.props;
    const { orderInfo, showBankTransferInfo } = this.state;
    const isValid = this.isValidToSubmit();
    if (orderInfo && showBankTransferInfo) {
      return <BankTransferInfo orderInfo={orderInfo} onDone={this.onBankTransferDone} />;
    }
    return (
      <div className={styles.container}>
        <BuyForm>
          <Field
            name="wallet"
            className='mt-4'
            component={walletSelectorField}
            validate={walletValidator}
            intl={intl}
          />
          <Field
            name="exchange"
            className='mt-4'
            component={exchangeField}
            orderType={paymentMethod}
            direction={EXCHANGE_DIRECTION.buy}
            fiatCurrency={supportedCurrency[0]}
            currency={wallet?.currency}
            validate={exchangeValidator}
            intl={intl}
          />
          <Field
            className='mt-4'
            name="paymentMethod"
            component={paymentMethodField}
            intl={intl}
          />
          <CodFieldSet show={paymentMethod === PAYMENT_METHOD.COD} intl={intl} className='mt-4' />
          <ConfirmButton
            disabled={!isValid}
            containerClassName='mt-5'
            buttonClassName={styles.submitBtn}
            message={<LabelLang id='coin.buy.confirmMsg' values={{ amount: exchange?.amount || 0, currency: exchange?.currency }} />}
            label={(
              <span>
                <FaLock /> <LabelLang id='coin.buy.buyBtn' values={{ amount: exchange?.amount || 0, currency: exchange?.currency}} />
              </span>
            )}
            onConfirm={this.makeOrder}
          />
        </BuyForm>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    paymentMethod: formSelector(state, 'paymentMethod'),
    exchange: formSelector(state, 'exchange'),
    wallet: formSelector(state, 'wallet'),
    userAddress: formSelector(state, 'address'),
    userPhone: formSelector(state, 'phone'),
    userNote: formSelector(state, 'noteAndTime'),
    supportedCurrency: state?.app?.supportedCurrency || [],
  };
};

const mapDispatchToProps = dispatch => ({
  makeOrder: bindActionCreators(makeOrder, dispatch),
  showAlert: bindActionCreators(showAlert, dispatch),
});

BuyCryptoCoin.defaultProps = {
  wallet: {},
  exchange: {},
  userAddress: {},
  userNote: '',
  userPhone: '',
  paymentMethod: null,
  makeOrder: null,
  showAlert: null,
  supportedCurrency: []
};

BuyCryptoCoin.propTypes = {
  exchange: PropTypes.object,
  wallet: PropTypes.object,
  paymentMethod: PropTypes.string,
  userAddress: PropTypes.object,
  userNote: PropTypes.string,
  userPhone: PropTypes.string,
  makeOrder: PropTypes.func,
  showAlert: PropTypes.func,
  supportedCurrency: PropTypes.array,
};

export default withRouter(injectIntl(connect(mapStateToProps, mapDispatchToProps)(BuyCryptoCoin)));
