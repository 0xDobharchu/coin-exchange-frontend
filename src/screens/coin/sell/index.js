import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Field, formValueSelector } from 'redux-form';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import createForm from 'src/components/core/form/createForm';
import { isRequired } from 'src/components/core/form/validator';
import { bindActionCreators } from 'redux';
import { PAYMENT_METHOD } from 'src/screens/coin/constant';
// import { DEFAULT_CURRENCY } from 'src/resources/constants/crypto';
import { URL } from 'src/resources/constants/url';
import ConfirmButton from 'src/components/confirmButton';
import inputField from 'src/components/core/form/fields/input';
import { showAlert } from 'src/screens/app/redux/action';
import { FaLock } from 'react-icons/fa';
import cx from 'classnames';
import exchangeField, { exchangeValidator } from './reduxFormFields/exchange';
import { makeOrder, genAddress, checkAddress } from './redux/action';
import styles from './styles.scss';

const sellFormName = 'SellForm';
const BuyForm = createForm({
  propsReduxForm: {
    form: sellFormName,
    initialValues: {
    },
  },
});
const formSelector = formValueSelector(sellFormName);

class SellCryptoCoin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      walletAddress: null,
    };
  }

  isValidToSubmit = () => {
    const { currency, exchange: { amount, fiatAmount }, bankName, bankAccountName, bankAccountNumber, bankUserPhoneNumber } = this.props;
    if (currency && amount && fiatAmount && bankName && bankAccountName && bankAccountNumber && bankUserPhoneNumber) {
      return true;
    }
    return false;
  }

  genAddress = (currency) => {
    const { genAddress } = this.props;
    return genAddress(currency).then(walletAddress => {
      this.setState({ walletAddress });
      return walletAddress;
    });
  }

  prepareToOrder = async () => {
    try {
      const { currency, checkAddress, showAlert } = this.props;
      const { walletAddress } = this.state;
      const isAddressValid = await checkAddress({ currency, address: walletAddress });
      if (walletAddress && isAddressValid?.hasTransaction) {
        this.makeOrder();
      } else {
        showAlert({
          message: 'Error while preparing to order, pls try again',
          type: 'danger',
          timeOut: 1000,
        });
      }
    } catch(e) {
      console.warn(e);
    }
  }

  makeOrder = () => {
    const { makeOrder, exchange, paymentMethod, bankName, bankAccountName, bankAccountNumber, bankUserPhoneNumber } = this.props;
    const { walletAddress } = this.state;
    const payload = {
      amount: String(exchange?.amount),
      currency: exchange?.currency,
      fiat_local_amount: String(exchange?.fiatAmount),
      fiat_local_currency: exchange?.fiatCurrency,
      order_type: paymentMethod,
      direction: 'sell',
      address: walletAddress,
      user_info: JSON.stringify({ bankName, bankAccountName, bankAccountNumber, bankUserPhoneNumber })
    };
    makeOrder(payload)
      .then(this.orderSuccessHandler)
      .catch(this.orderFailedHandler);
  }

  orderSuccessHandler = (/* orderInfo */) => {
    const { showAlert, history } = this.props;
    showAlert({
      message: 'Successful',
      timeOut: 1000,
    });
    history.push(URL.ME);
  }

  orderFailedHandler = () => {
    const { showAlert } = this.props;
    showAlert({
      message: 'Error while making new order, pls try again',
      type: 'danger',
      timeOut: 1000,
    });
  }

  resetState = () => {
    this.setState({
      walletAddress: null
    });
  }

  onBankTransferDone = () => {
    this.resetState();
  }

  renderBankInfoInput = () => {
    return (
      <div className={cx(styles.codInfo, 'mt-4')}>
        <Field
          type="text"
          name="bankName"
          placeholder="Bank name"
          component={inputField}
          className={styles.bankItem}
          validate={isRequired()}
        />
        <Field
          type="text"
          name="bankAccountNumber"
          placeholder="Account number"
          component={inputField}
          className={styles.bankItem}
          validate={isRequired()}
        />
        <Field
          type="text"
          name="bankAccountName"
          placeholder="Account name"
          component={inputField}
          className={styles.bankItem}
          validate={isRequired()}
        />
        <Field
          type="text"
          name="bankUserPhoneNumber"
          placeholder="Phone number"
          component={inputField}
          className={styles.bankItem}
          validate={isRequired()}
        />
      </div>
    );
  }

  render() {
    const { paymentMethod, supportedCurrency, exchange, currency } = this.props;
    const { walletAddress } = this.state;
    const isValid = this.isValidToSubmit();
    return (
      <div className={styles.container}>
        <BuyForm>
          <Field
            name="exchange"
            className='mt-4'
            component={exchangeField}
            orderType={paymentMethod}
            direction='buy'
            fiatCurrency={supportedCurrency[0]}
            currency={currency}
            validate={exchangeValidator}
          />
          { this.renderBankInfoInput() }
          <ConfirmButton
            disabled={!isValid}
            containerClassName='mt-5'
            buttonClassName={styles.submitBtn}
            label={(
              <span>
                <FaLock /> Sell {exchange?.amount || 0} {exchange?.currency}
              </span>
            )}
            onConfirm={() => this.genAddress(currency)}
          />
        </BuyForm>
        { walletAddress && <span>{walletAddress}</span>}
        <ConfirmButton
          containerClassName='mt-5'
          buttonClassName={styles.submitBtn}
          label={(
            <span>
              Make order
            </span>
          )}
          onConfirm={this.prepareToOrder}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  paymentMethod: formSelector(state, 'paymentMethod'),
  exchange: formSelector(state, 'exchange'),
  userAddress: formSelector(state, 'address'),
  userPhone: formSelector(state, 'phone'),
  userNote: formSelector(state, 'noteAndTime'),
  bankName: formSelector(state, 'bankName'),
  bankAccountNumber: formSelector(state, 'bankAccountNumber'),
  bankAccountName: formSelector(state, 'bankAccountName'),
  bankUserPhoneNumber: formSelector(state, 'bankUserPhoneNumber'),
  supportedCurrency: state?.app?.supportedCurrency || [],
});

const mapDispatchToProps = dispatch => ({
  makeOrder: bindActionCreators(makeOrder, dispatch),
  genAddress: bindActionCreators(genAddress, dispatch),
  checkAddress: bindActionCreators(checkAddress, dispatch),
  showAlert: bindActionCreators(showAlert, dispatch),
});

SellCryptoCoin.defaultProps = {
  exchange: {},
  currency: 'ETH',
  paymentMethod: PAYMENT_METHOD.TRANSFER,
  makeOrder: null,
  showAlert: null,
  supportedCurrency: []
};

SellCryptoCoin.propTypes = {
  exchange: PropTypes.object,
  currency: PropTypes.string,
  paymentMethod: PropTypes.string,
  makeOrder: PropTypes.func,
  showAlert: PropTypes.func,
  supportedCurrency: PropTypes.array,
};

export default withRouter(injectIntl(connect(mapStateToProps, mapDispatchToProps)(SellCryptoCoin)));
