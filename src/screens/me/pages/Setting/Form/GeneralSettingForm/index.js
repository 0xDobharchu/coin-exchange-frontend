import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Row, Col }from 'react-bootstrap';
import { Button } from 'src/components/custom';
import { LocalCurrencyField } from '../../LocalCurrency';
import { LanguageField } from '../../Language';

// eslint-disable-next-line
const GeneralSettingForm = ({ handleSubmit, onSubmit }) => (
  <form style={{ width: '100%' }}>
    <LocalCurrencyField />
    <LanguageField />
    <Row style={{ padding: '5px', marginTop: '10px' }}>
      <Col md={9} />
      <Col md={3}><Button onClick={handleSubmit(onSubmit)} value="Save" /></Col>
    </Row>
  </form>
);

const mapState = state => ({
  initialValues: {
    currency: state.auth.profile.currency,
    language: state.auth.profile.language
  }
});


export default compose(
  connect(mapState),
  reduxForm({
    form: 'GeneralSettingForm',
  })
)(GeneralSettingForm);
