import React from 'react';
// import cn from 'classnames';
import { Row, Col } from 'react-bootstrap';
import Switch from 'rc-switch';
import GeneralSettingForm from './Form/GeneralSettingForm';
import style from './style.scss';

// const onChange = values => console.log('swithch to', values);
const Setting = () => (
  <div className={style.container}>
    <label className={style.title}>General Settings</label>
    <div className={style.lineTitle} />
    <div className={style.block1}>
      <GeneralSettingForm onSubmit={values => alert(JSON.stringify(values))} />
    </div>
    <label className={style.title}>2-Factor Authentication</label>
    <div className={style.lineTitle} />
    <Row className={style.personalDetail}>
      <Col md={4} className={style.leftSide}>
        <Switch />
        <label className={style.fontLeft}>Your personal information is never shown to other users</label>
      </Col>
      {/* <Col md={8} className={style.rightSide}>
        <label>Require verification code to send</label>
        <div className={cn(style.radioItem, style.isgood)}>
          <div><input type="radio" name="verify_type" value="1" /></div>
          <label>Any amount - <span>Most secured</span></label>
        </div>
        <div className={style.radioItem}>
          <div><input type="radio" name="verify_type" value="1" /></div>
          <label>Over 2 BTC per day</label>
        </div>
        <div className={cn(style.radioItem, style.isbad)}>
          <div><input type="radio" name="verify_type" value="1" /></div>
          <label>Any amount - <span>Most secured</span></label>
        </div>
      </Col> */}
    </Row>
    <label className={style.title}>Activity</label>
    <div className={style.lineTitle} />
  </div>
);

export default Setting;