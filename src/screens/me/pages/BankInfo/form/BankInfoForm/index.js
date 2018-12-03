import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Row, Col }from 'react-bootstrap';
import { LabelLang, FieldLang } from 'src/lang/components';
import { Button, InputField } from 'src/components/custom';
import style from './style.scss';

// eslint-disable-next-line
const BankInfoForm = ({ handleSubmit, onSubmit, onDelete, isEditMode = true }) => (
  <form className={style.container}>
    <Row className={style.row}>
      <Col md={6}><LabelLang id="me.bankInfo.bankName" /></Col>
      <Col md={6}><FieldLang name="bankName" component={InputField} placeholder="me.bankInfo.bankNameHolder" /></Col>
    </Row>
    <Row className={style.row}>
      <Col md={6}><LabelLang id="me.bankInfo.bankAccountName" /></Col>
      <Col md={6}><FieldLang name="bankAccountName" component={InputField} placeholder="me.bankInfo.bankAccountNameHolder" /></Col>
    </Row>
    <Row className={style.row}>
      <Col md={6}><LabelLang id="me.bankInfo.bankAccountNumber" /></Col>
      <Col md={6}><FieldLang name="bankAccountNumber" component={InputField} placeholder="me.bankInfo.bankAccountNumberHolder" /></Col>
    </Row>
    
    {isEditMode && (
    <Row style={{ padding: '5px', marginTop: '10px' }}>
      <Col md={9} />
      <Col md={3}><Button onClick={handleSubmit(onSubmit)} value="Save" /></Col>
    </Row>)}
    {!isEditMode && (
    <Row style={{ padding: '5px', marginTop: '10px' }}>
      <Col md={9} />
      <Col md={3}><Button onClick={onDelete} value="Delete" /></Col>
    </Row>)}
    
  </form>
);

const mapState = state => ({
  initialValues: {
    bankName: state.auth.profile.payment_info?.bankName || '',
    bankAccountName: state.auth.profile.payment_info?.bankAccountName || '',
    bankAccountNumber: state.auth.profile.payment_info?.bankAccountNumber || '',
  }
});


export default compose(
  connect(mapState),
  reduxForm({
    form: 'BankInfoForm',
  })
)(BankInfoForm);
