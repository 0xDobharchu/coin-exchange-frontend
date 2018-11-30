import React from 'react';
import { connect } from 'react-redux';
import { showAlert } from 'src/screens/app/redux/action';
import { sendEmailVerify } from 'src/screens/auth/redux/api';
import { LabelLang } from 'src/lang/components';
import { getCurrentLevel } from '../../MeProfile/util';
import style from './style.scss';

// eslint-disable-next-line
const EmailBlock = ({ email, level, levelStatus, showAlert }) => {
  const handleOnVerify = () => {
    sendEmailVerify().then(() => showAlert({
      message: 'me.accountLevel.alert.sendEmailCodeSuccess',
      timeOut: 3000,
      type: 'success'
    }));
  };
  return (
    <div className={style.container}>
      <div className={style.col2}>
        <div className={style.col2_1}><LabelLang id="me.accountInfo.email" /></div>
        {getCurrentLevel(level, levelStatus) === 0 && <div className={style.col2_2}>Your email is not verified. <button type="button" onClick={handleOnVerify}>Verify now</button></div>}
      </div>
      <div className={style.col3}>
        <input type="text" value={email} disabled />
      </div>
    </div>);
};

const mapState = state => ({
  email: state.auth.profile.email,
  level: state.auth.profile.verification_level,
  levelStatus: state.auth.profile.verification_status,
});
export default connect(mapState, { showAlert })(EmailBlock);
