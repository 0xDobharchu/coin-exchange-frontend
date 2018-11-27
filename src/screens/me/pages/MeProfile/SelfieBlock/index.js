import React from 'react';
import { connect } from 'react-redux';
import { showAlert } from 'src/screens/app/redux/action';
import { submitVerifyLevel4Action } from 'src/screens/auth/redux/action';
import { MyMessage } from 'src/lang/components';
import SelfieForm from './SelfieForm';
import { getColorByLevel, getStatusByLevel } from '../util';

// eslint-disable-next-line
const SelfieBlock = ({ style, level, levelStatus, showAlert, submitVerifyLevel4Action }) => {
  const handleSubmitForm = values => {
    submitVerifyLevel4Action(values);
    showAlert({
      message: 'me.accountLevel.alert.lv4',
      timeOut: 3000,
      type: 'success'
    });
  };
  return (
    <div className={style.collapse_custom}>
      <div className={style.head}>
        <p className={style.label}>
          <MyMessage id="me.profile.verify.step4" />
        </p>
        <div className={style.extend}>
          <span className={`badge badge-${getColorByLevel(4, level, levelStatus)}`}>{getStatusByLevel(4, level, levelStatus)}</span>
        </div>
      </div>
      <div className={style.content}>
        <p className={style.text}><MyMessage id="me.profile.text.id_verification.desc12" /></p>
      </div>
      <SelfieForm onSubmit={handleSubmitForm} />
    </div>);
};

const mapState = state => ({
  level: state.auth.profile.verification_level,
  levelStatus: state.auth.profile.verification_status,
});
const mapDispatch = { showAlert, submitVerifyLevel4Action };

export default connect(mapState, mapDispatch)(SelfieBlock);