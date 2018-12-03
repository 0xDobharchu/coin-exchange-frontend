import React from 'react';
import { connect } from 'react-redux';
import { LabelLang } from 'src/lang/components';
import { showAlert } from 'src/screens/app/redux/action';
import { updateProfileAction } from 'src/screens/auth/redux/action';
import BankInfoForm from './form/BankInfoForm';
import style from './style.scss';

// eslint-disable-next-line
const BankInfo = ({ updateProfileAction, showAlert }) => {
  const showMessage = (message, type) => showAlert({ message, type });
  const showSuccess = id => showMessage(id, 'success');
  const showError = id => showMessage(id, 'danger');
  const handleSubmit = values => {
    updateProfileAction({ payment_info: JSON.stringify(values) }).then(() => showSuccess('me.bankInfo.alert.success')).catch(() => showError('me.bankInfo.alert.failed'));
  };
  const handleDelete = () => updateProfileAction({ payment_info: '' }).then(() => showSuccess('me.bankInfo.alert.success')).catch(() => showError('me.bankInfo.alert.failed'));

  return (
    <div className={style.container}>
      <label className={style.title}><LabelLang id="me.bankInfo.title" /></label>
      <div className={style.lineTitle} />
      <div className={style.block1}>
        <BankInfoForm isEditMode={false} onSubmit={handleSubmit} onDelete={handleDelete} />
      </div>
    </div>);
};

export default connect(null, { updateProfileAction, showAlert })(BankInfo);