import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getCountries } from 'src/screens/register/action';
import { Field, reduxForm } from 'redux-form';
import { Row, Col }from 'react-bootstrap';
import dropdownField from 'src/components/core/form/fields/dropdown';
import { InputField, Button } from 'src/components/custom';
import style from './style.scss';

const mocksCountry = [
  { label: 'Hong Kong', value: 'HK'},
  { label: 'Indonesia', value: 'ID'},
  { label: 'Combodia', value: 'KH'},
  { label: 'Philippiens', value: 'PH'},
];
const DropDownField = () => (
  <Field
    name="country"
    component={dropdownField}
    list={mocksCountry}
  />
);

// eslint-disable-next-line
const PersonalDetailForm = ({ handleSubmit, onSubmit }) => (
  <form className={style.container}>
    <label>Legal name</label>
    <Row>
      <Col md={6}>
        <Field name="first_name" component={InputField} placeholder="First Name" />
      </Col>
      <Col md={6}>
        <Field name="last_name" component={InputField} placeholder="Last Name" />
      </Col>
    </Row>
    <label>Country</label>
    <DropDownField />
    <Button className={style.button} value="Save" onClick={handleSubmit(onSubmit)} />
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
