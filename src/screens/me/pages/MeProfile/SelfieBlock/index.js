import React from 'react';
import { connect } from 'react-redux';
import { showAlert } from 'src/screens/app/redux/action';
import { submitVerifyLevel4Action } from 'src/screens/auth/redux/action';
import { LabelLang } from 'src/lang/components';
import SelfieForm from './SelfieForm';
import {getColorByLevel, getCurrentLevel, getStatusByLevel} from '../util';

// eslint-disable-next-line
const SelfieBlock = ({ style, level, levelStatus, showAlert, submitVerifyLevel4Action }) => {
  const handleSubmitForm = values => {
    if (!values.selfie_image) {
      showAlert({
        message: 'me.accountLevel.alert.imageSelfieRequired',
        timeOut: 3000,
        type: 'danger'
      });
    }
    submitVerifyLevel4Action(values);
    showAlert({
      message: 'me.accountLevel.alert.lv4',
      timeOut: 3000,
      type: 'success'
    });
  };
  const currentLevel = getCurrentLevel(level, levelStatus);

  return (
    <div className={style.collapse_custom}>
      <div className={style.head}>
        <p className={style.label}>
          <LabelLang id="me.accountLevel.step4" />
        </p>
        <div className={style.extend}>
          <span className={`badge badge-${getColorByLevel(4, level, levelStatus)}`}>{getStatusByLevel(4, level, levelStatus)}</span>
        </div>
      </div>
      <div className={style.content}>
        <p className={style.text}><LabelLang id="me.accountLevel.wrm3" /></p>
      </div>
      {3 <= currentLevel && <SelfieForm onSubmit={handleSubmitForm} />}
    </div>);
};

const mapState = state => ({
  level: state.auth.profile.verification_level,
  levelStatus: state.auth.profile.verification_status,
});
const mapDispatch = { showAlert, submitVerifyLevel4Action };

export default connect(mapState, mapDispatch)(SelfieBlock);
