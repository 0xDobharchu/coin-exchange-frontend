import React from 'react';
import { connect } from 'react-redux';
import { getCurrenciesByCountry } from 'src/screens/auth/redux/api';
import dropdownField from 'src/components/core/form/fields/dropdown';
import { Field } from 'redux-form';
import style from './style.scss';

class DropDownCurrencyFieldComp extends React.Component {
  state = {
    currencies: []
  }
  componentDidMount() {
    // eslint-disable-next-line
    const { country } = this.props;
    getCurrenciesByCountry(country).then(r => {
      const currencies = r.map(({ currency }) => ({ label: currency, value: currency }));
      this.setState({ currencies });
    }).catch(err => err);
  }
  render() {
    const { currencies } = this.state;
    return (
      <Field
        name="currency"
        component={dropdownField}
        list={currencies}
      />
    );
  }
}
const mapState = state => ({
  country: state.auth.profile.country
});
const DropDownCurrencyField = connect(mapState)(DropDownCurrencyFieldComp);

const LocalCurrency = () => (
  <div className={style.container}>
    <div className={style.col2}>
      <div className={style.col2_1}>Local Currency</div>
      {/* <div className={style.col2_2}></div> */}
    </div>
    <div className={style.col3}>
      <input type="text" />
    </div>
  </div>
);

export const LocalCurrencyField = () => (
  <div className={style.container}>
    <div className={style.col2}>
      <div className={style.col2_1}>Local Currency</div>
      {/* <div className={style.col2_2}>This name will be shown in your preview</div> */}
    </div>
    <div className={style.col3}>
      <DropDownCurrencyField />
    </div>
  </div>
);

export default LocalCurrency;
