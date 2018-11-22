import React from 'react';
// import cn from 'classnames';
import { connect } from 'react-redux';
import { showAlert } from 'src/screens/app/redux/action';
import { MyMessage } from 'src/lang/components';
import { updateProfileAction } from 'src/screens/auth/redux/action';
import { Row, Col } from 'react-bootstrap';
import Switch from 'rc-switch';
import GeneralSettingForm from './Form/GeneralSettingForm';
import style from './style.scss';

// const onChange = values => console.log('swithch to', values);
// eslint-disable-next-line
const Setting = ({ updateProfileAction, showAlert }) => {
  const showMessage = (id, type) => showAlert({
    message: <MyMessage id={id} />,
    type
  });
  const showSuccess = id => showMessage(id, 'success');
  const showError = id => showMessage(id, 'danger');
  const handleUpdateProfile = values => updateProfileAction(values).then(showSuccess('Update Success')).catch(() => showError('Update Failed'));

  return (
    <div className={style.container}>
      <label className={style.title}>General Settings</label>
      <div className={style.lineTitle} />
      <div className={style.block1}>
        <GeneralSettingForm onSubmit={handleUpdateProfile} />
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
};

const mapDispatch = { updateProfileAction, showAlert };
export default connect(null, mapDispatch)(Setting);