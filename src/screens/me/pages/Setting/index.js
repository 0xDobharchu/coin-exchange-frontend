import React from 'react';
import { LabelLang } from 'src/lang/components';
import { connect } from 'react-redux';
import { showAlert } from 'src/screens/app/redux/action';
import { updateProfileAction } from 'src/screens/auth/redux/action';
import GeneralSettingForm from './Form/GeneralSettingForm';
// import TwoFactor from './TwoFactor';
import style from './style.scss';

// eslint-disable-next-line
const Setting = ({ updateProfileAction, showAlert }) => {
  const showMessage = (message, type) => showAlert({ message, type });
  const showSuccess = id => showMessage(id, 'success');
  const showError = id => showMessage(id, 'danger');
  const handleUpdateProfile = values => updateProfileAction(values).then(() => showSuccess('me.accountInfo.alert.success')).catch(() => showError('me.accountInfo.alert.failed'));
  console.log('settings page========================================================');
  return (
    <div className={style.container}>
      <label className={style.title}><LabelLang id="me.setting.title" /></label>
      <div className={style.lineTitle} />
      <div className={style.block1}>
        <GeneralSettingForm onSubmit={handleUpdateProfile} />
      </div>
      {/* <label className={style.title}>2-Factor Authentication</label>
      <div className={style.lineTitle} />
      <TwoFactor />
      <label className={style.title}>Activity</label>
      <div className={style.lineTitle} /> */}
    </div>
  );
};

const mapDispatch = { updateProfileAction, showAlert };
export default connect(null, mapDispatch)(Setting);