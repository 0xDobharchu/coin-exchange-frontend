import React from 'react';
import { connect } from 'react-redux';
import { showAlert } from 'src/screens/app/redux/action';
import { MyMessage } from 'src/lang/components';
import { updateProfileAction } from 'src/screens/auth/redux/action';
import { Row, Col } from 'react-bootstrap';
import ChangePassword from './ChangePassword';
import ChangeNameForm from './Form/ChangeNameForm';
import PersonalDetailForm from './Form/PersonalDetailForm';
import style from './style.scss';

// eslint-disable-next-line
const AccountInfo = ({ updateProfileAction, showAlert }) => {
  const showSuccess = id => showAlert({
    message: <MyMessage id={id} />,
    type: 'success'
  });

  const handleUpdateNickname = values => updateProfileAction(values).then(showSuccess('Update Profile Success'));
  return (
    <div className={style.container}>
      <label className={style.title}>User Profile</label>
      <div className={style.lineTitle} />
      <div className={style.block1}>
        <ChangePassword />
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
    </div>
  );
};

const mapDispatch = { updateProfileAction, showAlert };
export default connect(null, mapDispatch)(AccountInfo);
