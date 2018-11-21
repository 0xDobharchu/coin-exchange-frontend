import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Row, Col }from 'react-bootstrap';
import { InputField, Button } from 'src/components/custom';
import style from './style.scss';

// eslint-disable-next-line
const PersonalDetailForm = ({ handleSubmit, onSubmit }) => (
  <form className={style.container}>
    <label>Legal name</label>
    <Row>
      <Col md={6}>
        <Field name="first_name" component={InputField} placeholder="First Name1" />
      </Col>
      <Col md={6}>
        <Field name="last_name" component={InputField} placeholder="Last Name" />
      </Col>
    </Row>
    <label>Country</label>
    <Field name="country" component={InputField} placeholder="Enter Your Country" />
    <Button className={style.button} value="Save" onClick={()=> alert('Success')} />
  </form>
);

const mapState = state => ({
  initialValues: {
    first_name: state.auth.profile.name,
    last_name: state.auth.profile.email
  }
});


export default compose(
  connect(mapState),
  reduxForm({
    form: 'PersonalDetailForm',
  })
)(PersonalDetailForm);
