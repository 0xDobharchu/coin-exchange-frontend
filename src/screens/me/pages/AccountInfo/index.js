import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ChangePassword from './ChangePassword';
import ChangeNameForm from './Form/ChangeNameForm';
import PersonalDetailForm from './Form/PersonalDetailForm';
import style from './style.scss';

const AccountInfo = () => (
  <div className={style.container}>
    <label className={style.title}>User Profile</label>
    <div className={style.lineTitle} />
    <div className={style.block1}>
      <ChangePassword />
    </div>
    <div className={style.lineTitle} />
    <div className={style.block1}>
      <ChangeNameForm onSubmit={values => alert(JSON.stringify(values))} />
    </div>
    <label className={style.title}>Personal Details</label>
    <div className={style.lineTitle} />
    <Row className={style.personalDetail}>
      <Col md={4} className={style.leftSide}>
        <label className={style.fontLeft}>Your personal information is never shown to other users</label>
      </Col>
      <Col md={8}>
        <PersonalDetailForm onSubmit={values => alert(JSON.stringify(values))} />
      </Col>
    </Row>
  </div>
);

export default AccountInfo;
