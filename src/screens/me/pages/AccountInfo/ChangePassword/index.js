import React from 'react';
import { Input, Button } from '@/components/custom';
import {  Row, Col }from 'react-bootstrap';
import style from './style.scss';

const ChangePassword = () => (
  <Row className={style.container}>
    <Col md={4}><Input type="password" placeholder="Old password" /></Col>
    <Col md={4}><Input type="password" placeholder="New password" /></Col>
    <Col md={4}><Button value="Change password" /></Col>
  </Row>
);

export default ChangePassword;
