import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FieldLang, WrapperLang, LabelLang } from 'src/lang/components';
import { getCountries } from 'src/screens/auth/redux/api';
import { Field, reduxForm } from 'redux-form';
import { Row, Col }from 'react-bootstrap';
import dropdownField from 'src/components/core/form/fields/dropdown';
import { InputField, Button } from 'src/components/custom';
import style from './style.scss';

class DropDownCountriesField extends React.Component {

  state = {
    countries: []
  }

  componentDidMount() {
    getCountries().then(r => {
      const countries = r.map(({ country: value, country_name: label }) => ({ label, value }));
      this.setState({ countries });
    }).catch(err =>err);
  }

  render() {
    const { countries } = this.state;
    return (
      <Field
        name="country"
        component={dropdownField}
        list={countries}
      />
    );
  }
}


// eslint-disable-next-line
const PersonalDetailForm = ({ handleSubmit, onSubmit }) => (
  <form className={style.container}>
    <label><LabelLang id="me.accountInfo.legalName" /></label>
    <Row>
      <Col md={6}>
        <FieldLang name="first_name" component={InputField} placeholder="me.accountInfo.firstName" />
      </Col>
      <Col md={6}>
        <FieldLang name="last_name" component={InputField} placeholder="me.accountInfo.lastName" />
      </Col>
    </Row>
    <label><LabelLang id="me.accountInfo.country" /></label>
    <DropDownCountriesField />
    <WrapperLang>
      {ts =>
        <Button className={style.button} value={ts('me.accountInfo.save')} onClick={handleSubmit(onSubmit)} />
      }
    </WrapperLang>
  </form>
);

const mapState = state => ({
  initialValues: {
    first_name: state.auth.profile.first_name,
    last_name: state.auth.profile.last_name,
    country: state.auth.profile.country,
  }
});

const mapDispatch = { getCountries };

export default compose(
  connect(mapState, mapDispatch),
  reduxForm({
    form: 'PersonalDetailForm',
  })
)(PersonalDetailForm);
