import React from 'react';
import { connect } from 'react-redux';
import { showAlert } from 'src/screens/app/redux/action';
import { MyMessage } from 'src/lang/components';
import { updateProfileAction } from 'src/screens/auth/redux/action';
import GeneralSettingForm from './Form/GeneralSettingForm';
import TwoFactor from './TwoFactor';
import style from './style.scss';

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
      <TwoFactor />
      <label className={style.title}>Activity</label>
      <div className={style.lineTitle} />
    </div>
  );
};

const mapDispatch = { updateProfileAction, showAlert };
export default connect(null, mapDispatch)(Setting);