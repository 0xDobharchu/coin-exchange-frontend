import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { WrapperLang, LabelLang } from 'src/lang/components';
import { getCountries, getCurrenciesByCountry } from 'src/screens/auth/redux/api';
import { Field, reduxForm } from 'redux-form';
import dropdownField from 'src/components/core/form/fields/dropdown';
import { Button } from 'src/components/custom';
import style from './style.scss';

// eslint-disable-next-line
class PersonalDetailForm extends React.Component {
  state = {
    countries: [],
    currencies: []
  }

  handleLoadCurrencies = (country) => {
    getCurrenciesByCountry(country).then(r => {
      const currencies = r.map(({ currency }) => ({ label: currency, value: currency }));
      this.setState({ currencies });
    }).catch(err => err);
  }

  componentDidMount() {
    getCountries().then(r => {
      const countries = r.map(({ country: value, country_name: label }) => ({ label, value }));
      this.setState({ countries });
    }).catch(err =>err);
    // eslint-disable-next-line
    const { initialValues: { country }} = this.props;
    if (country) {
      this.handleLoadCurrencies(country);
    }
  }

  render() {
    const { handleSubmit, onSubmit } = this.props;
    const { countries, currencies } = this.state;
    return (
      <form className={style.container}>
        {/* <label><LabelLang id="me.accountInfo.legalName" /></label>
        <Row>
          <Col md={6}>
            <FieldLang name="first_name" component={InputField} placeholder="me.accountInfo.firstName" />
          </Col>
          <Col md={6}>
            <FieldLang name="last_name" component={InputField} placeholder="me.accountInfo.lastName" />
          </Col>
        </Row> */}
        <label><LabelLang id="me.accountInfo.country" /></label>
        <Field
          name="country"
          handleOnChange={this.handleLoadCurrencies}
          component={dropdownField}
          list={countries}
        />
        <label><LabelLang id="me.accountInfo.currency" /></label>
        <Field
          name="currency"
          component={dropdownField}
          list={currencies}
        />
        <WrapperLang>
          {ts =>
            <Button className={style.button} value={ts('me.accountInfo.save')} onClick={handleSubmit(onSubmit)} />
          }
        </WrapperLang>
      </form>
    );
  }
}

const mapState = state => ({
  initialValues: {
    // first_name: state.auth.profile.first_name,
    // last_name: state.auth.profile.last_name,
    country: state.auth.profile.country,
    currency: state.auth.profile.currency,
  }
});

const mapDispatch = { getCountries };

export default compose(
  connect(mapState, mapDispatch),
  reduxForm({
    form: 'PersonalDetailForm',
  })
)(PersonalDetailForm);
