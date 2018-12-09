import React from 'react';
import { isPassword, isRequired } from 'src/components/core/form/validator';
import { FieldLang, WrapperLang, LabelLang } from 'src/lang/components';
import { reduxForm }from 'redux-form';
import { PasswordField, Button } from 'src/components/custom';
import {  Row, Col }from 'react-bootstrap';
import style from './style.scss';

const isPassword8 = isPassword(8);
const isNewPasswordRequired = isRequired(<LabelLang id="me.accountInfo.validate.newPasswordRequired" />);
// eslint-disable-next-line
const ChangePasswordForm = ({ handleSubmit, onSubmit }) => (
  <Row className={style.container}>
    <Col md={4}><FieldLang name="old_password" component={PasswordField} validate={isPassword8} placeholder="me.accountInfo.oldPassword" /></Col>
    <Col md={4}><FieldLang name="password" component={PasswordField} validate={[isNewPasswordRequired]} placeholder="me.accountInfo.newPassword" /></Col>
    <Col md={4}>
      <WrapperLang>
        {ts => <div><Button value={ts('me.accountInfo.changePassword')} onClick={handleSubmit(onSubmit)} /></div>}
      </WrapperLang>
    </Col>
  </Row>
);

export default reduxForm({
  form: 'ChangePasswordForm',
})(ChangePasswordForm);
