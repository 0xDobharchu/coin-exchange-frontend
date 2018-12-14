import React from 'react';
import { connect } from 'react-redux';
import { LabelLang } from 'src/lang/components';
import { showAlert } from 'src/screens/app/redux/action';
import { changePassword } from 'src/screens/auth/redux/api';
import { updateProfileAction } from 'src/screens/auth/redux/action';
import { Row, Col } from 'react-bootstrap';
import ChangePassword from './ChangePassword';
import EmailBlock from './EmailBlock';
import ChangeNameForm from './Form/ChangeNameForm';
import PersonalDetailForm from './Form/PersonalDetailForm';
import ApiToken from './ApiToken';
import style from './style.scss';

// eslint-disable-next-line
const AccountInfo = ({ updateProfileAction, showAlert }) => {
  const showMessage = (message, type) => showAlert({ message, type });
  const showSuccess = id => showMessage(id, 'success');
  const showError = id => showMessage(id, 'danger');
  const handleChangePassword = values => changePassword(values).then(() => showSuccess('me.accountInfo.alert.passwordSuccess')).catch(() => showError('me.accountInfo.alert.passwordFailed'));
  const handleUpdateNickname = values => updateProfileAction(values).then(() => showSuccess('me.accountInfo.alert.success'));
  
  return (
    <div className={style.container}>
      <label className={style.title}><LabelLang id="me.accountInfo.userProfile" /></label>
      <div className={style.lineTitle} />
      <div className={style.block1}>
        <ChangePassword onSubmit={handleChangePassword} />
      </div>
      <div className={style.lineTitle} />
      <div className={style.block1}>
        <EmailBlock />
        <ChangeNameForm onSubmit={handleUpdateNickname} />
      </div>
      <label className={style.title}><LabelLang id="me.accountInfo.personalDetails" /></label>
      <div className={style.lineTitle} />
      <Row className={style.personalDetail}>
        <Col md={4} className={style.leftSide}>
          <label className={style.fontLeft}><LabelLang id="me.accountInfo.personalDetailsDesc" /></label>
        </Col>
        <Col md={8}>
          <PersonalDetailForm onSubmit={handleUpdateNickname} />
        </Col>
      </Row>
      <div className={style.block1} />
      <label className={style.title}><LabelLang id="me.accountInfo.apiTokenTitle" /></label>
      <div className={style.lineTitle} />
      <ApiToken />
    </div>
  );
};

const mapDispatch = { updateProfileAction, showAlert };
export default connect(null, mapDispatch)(AccountInfo);
