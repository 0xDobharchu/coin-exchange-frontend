import React from 'react';
import { connect } from 'react-redux';
import { showAlert } from 'src/screens/app/redux/action';
import { MyMessage } from 'src/lang/components';
import { changePassword } from 'src/screens/auth/redux/api';
import { updateProfileAction } from 'src/screens/auth/redux/action';
import { Row, Col } from 'react-bootstrap';
import ChangePassword from './ChangePassword';
import ChangeNameForm from './Form/ChangeNameForm';
import PersonalDetailForm from './Form/PersonalDetailForm';
import Referral from './Referral';
import style from './style.scss';

// eslint-disable-next-line
const AccountInfo = ({ updateProfileAction, showAlert }) => {
  const showMessage = (id, type) => showAlert({
    message: <MyMessage id={id} />,
    type
  });
  const showSuccess = id => showMessage(id, 'success');
  const showError = id => showMessage(id, 'danger');
  const handleChangePassword = values => changePassword(values).then(showSuccess('Update password success')).catch(showError('Update Password Failed'));
  const handleUpdateNickname = values => updateProfileAction(values).then(showSuccess('Update Profile Success'));
  return (
    <div className={style.container}>
      <label className={style.title}>User Profile</label>
      <div className={style.lineTitle} />
      <div className={style.block1}>
        <ChangePassword onSubmit={handleChangePassword} />
      </div>
      <div className={style.lineTitle} />
      <div className={style.block1}>
        <ChangeNameForm onSubmit={handleUpdateNickname} />
      </div>
      <label className={style.title}>Personal Details</label>
      <div className={style.lineTitle} />
      <Row className={style.personalDetail}>
        <Col md={4} className={style.leftSide}>
          <label className={style.fontLeft}>Your personal information is never shown to other users</label>
        </Col>
        <Col md={8}>
          <PersonalDetailForm onSubmit={handleUpdateNickname} />
        </Col>
      </Row>
      <label className={style.title}>Referral</label>
      <div className={style.lineTitle} />
      <label>Your referral link: <a href="http://coinbown.com/referral">here</a></label>
      <Referral />
    </div>
  );
};

const mapDispatch = { updateProfileAction, showAlert };
export default connect(null, mapDispatch)(AccountInfo);
