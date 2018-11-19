import React from 'react';
// import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { change, Field, touch } from 'redux-form';
import { connect } from 'react-redux';
import createForm from 'src/components/core/form/createForm';
import { isRequired } from 'src/components/core/form/validator';
import { bindActionCreators } from 'redux';
import ConfirmButton from 'src/components/confirmButton';
import walletSelectorField from './reduxFormFields/walletSelector';
import exchangeField from './reduxFormFields/exchange';
import paymentMethodField from './reduxFormFields/paymentMethod';
import { PAYMENT_METHOD } from './components/paymentMethod';
import styles from './styles.scss';

const buyFormName = 'BuyForm';
const BuyForm = createForm({
  propsReduxForm: {
    form: buyFormName,
    initialValues: {
      paymentMethod: PAYMENT_METHOD.COD
    },
  },
});

class BuyCryptoCoin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  
  render() {
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
            // validate={[isRequired()]}
          />
          <Field
            name="paymentMethod"
            component={paymentMethodField}
            // validate={[isRequired()]}
          />
          <ConfirmButton />
        </BuyForm>
      </div>
    );
  }
}

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => ({
  rfChange: bindActionCreators(change, dispatch),
  rfTouch: bindActionCreators(touch, dispatch),
});

BuyCryptoCoin.defaultProps = {
};

BuyCryptoCoin.propTypes = {
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(BuyCryptoCoin));
