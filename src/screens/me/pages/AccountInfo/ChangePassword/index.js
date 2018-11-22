import React from 'react';
import { Field, reduxForm }from 'redux-form';
import { InputField, Button } from '@/components/custom';
import {  Row, Col }from 'react-bootstrap';
import style from './style.scss';

// eslint-disable-next-line
const ChangePasswordForm = ({ handleSubmit, onSubmit }) => (
  <Row className={style.container}>
    <Col md={4}><Field name="old_password" component={InputField} placeholder="Old Password" /></Col>
    <Col md={4}><Field name="password" component={InputField} placeholder="New Password" /></Col>
    <Col md={4}><Button value="Change password" onClick={handleSubmit(onSubmit)} /></Col>
  </Row>
);

export default reduxForm({
  form: 'ChangePasswordForm',
})(ChangePasswordForm);