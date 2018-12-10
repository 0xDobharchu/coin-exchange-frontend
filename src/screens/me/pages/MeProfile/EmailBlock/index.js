import React from 'react';
import { sendEmailVerify } from 'src/screens/auth/redux/api';
import { connect } from 'react-redux';
import { showAlert } from 'src/screens/app/redux/action';
import { LabelLang } from 'src/lang/components';
// import valid from 'src/services/validate';
import EmailForm from './EmailForm';
import { getColorByLevel, getStatusByLevel } from '../util';


// eslint-disable-next-line
const EmailBlock = ({ style, msg, showAlert, email, level, levelStatus }) => {
  const handleVerifyEmail = (values) => {
    console.log('submit email values is', values);
    sendEmailVerify().then(r => {
      console.log('show alert', r);
      showAlert({
        message: 'VerifyCode is sent success to your mail. Pls check!',
        timeOut: 3000,
        type: 'success'
      });
    });
  };

  return (
    <div className={style.collapse_custom}>
      <div className={style.head}>
        <p className={style.label}>
          <LabelLang id="me.accountLevel.step1" />
        </p>
        <div className={style.extend}>
          <span className={`badge badge-${getColorByLevel(1, level, levelStatus)}`}>{getStatusByLevel(1, level, levelStatus)}</span>
        </div>
      </div>
      <div className={style.content}>
        <p className={style.text}><LabelLang id="me.accountLevel.wrm1" values={msg} /></p>
      </div>
      <EmailForm onSubmit={handleVerifyEmail} />
    </div>
  );
};

const mapState = state => ({
  email: state.auth.profile?.email || null,
  level: state.auth.profile.verification_level,
  levelStatus: state.auth.profile.verification_status,
});
const mapDispatch = { showAlert };
export default connect(mapState, mapDispatch)(EmailBlock);
