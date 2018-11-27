import React from 'react';
import { FieldLang, WrapperLang } from 'src/lang/components';
import { reduxForm }from 'redux-form';
import { PasswordField, Button } from 'src/components/custom';
import {  Row, Col }from 'react-bootstrap';
import style from './style.scss';

// eslint-disable-next-line
const ChangePasswordForm = ({ handleSubmit, onSubmit }) => (
  <Row className={style.container}>
    <Col md={4}><FieldLang name="old_password" component={PasswordField} placeholder="me.accountInfo.oldPassword" /></Col>
    <Col md={4}><FieldLang name="password" component={PasswordField} placeholder="me.accountInfo.newPassword" /></Col>
    <Col md={4}>
      <WrapperLang>{ts => <Button value={ts('me.accountInfo.changePassword')} onClick={handleSubmit(onSubmit)} />}</WrapperLang>
    </Col>
  </Row>
);

export default reduxForm({
  form: 'ChangePasswordForm',
})(ChangePasswordForm);