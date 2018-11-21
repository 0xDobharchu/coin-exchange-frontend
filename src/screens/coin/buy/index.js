import React from 'react';
// import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Field, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import createForm from 'src/components/core/form/createForm';
import { isRequired } from 'src/components/core/form/validator';
// import { bindActionCreators } from 'redux';
import { PAYMENT_METHOD } from 'src/screens/coin/constant';
import ConfirmButton from 'src/components/confirmButton';
import walletSelectorField from './reduxFormFields/walletSelector';
import exchangeField from './reduxFormFields/exchange';
import paymentMethodField from './reduxFormFields/paymentMethod';
import { genAddress, makeOrder } from './redux/action';
import styles from './styles.scss';

const buyFormName = 'BuyForm';
const BuyForm = createForm({
  propsReduxForm: {
    form: buyFormName,
    initialValues: {
      wallet: '0x4754a30140148d4d8a561cb6d373199cc928d429',
      paymentMethod: PAYMENT_METHOD.TRANSFER
    },
  },
});
const formSelector = formValueSelector(buyFormName);

class BuyCryptoCoin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
  }

  makeOrder = () => {
    const { makeOrder, wallet, exchange, paymentMethod } = this.props;
    makeOrder({
      amount: exchange?.amount,
      currency: exchange?.currency,
      fiat_local_amount: exchange?.fiatAmount,
      fiat_local_currency: exchange?.fiatCurrency,
      order_type: paymentMethod,
      direction: 'buy',
      address: wallet,
    });
  }

  render() {
    const { paymentMethod } = this.props;
    return (
      <div className={styles.container}>
        <BuyForm onSubmit={console.log} validate={console.log}>
          <Field
            name="wallet"
            component={walletSelectorField}
            validate={[isRequired()]}
          />
          <Field
            name="exchange"
            component={exchangeField}
            orderType={paymentMethod}
            direction='buy'
            fiatCurrency='PHP'
            currency='ETH'
            // validate={[isRequired()]}
          />
          <Field
            name="paymentMethod"
            component={paymentMethodField}
            // validate={[isRequired()]}
          />
          <ConfirmButton
            onConfirm={this.makeOrder}
          />
        </BuyForm>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  paymentMethod: formSelector(state, 'paymentMethod'),
  exchange: formSelector(state, 'exchange'),
  wallet: formSelector(state, 'wallet'),
});

// const mapDispatchToProps = dispatch => ({
//   rfChange: bindActionCreators(change, dispatch),
//   rfTouch: bindActionCreators(touch, dispatch),
//   genAddress,
//   makeOrder: bindActionCreators(makeOrder, dispatch),
// });

BuyCryptoCoin.defaultProps = {
};

BuyCryptoCoin.propTypes = {
};

export default injectIntl(connect(mapStateToProps, { genAddress, makeOrder })(BuyCryptoCoin));
