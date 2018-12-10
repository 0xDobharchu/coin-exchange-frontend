import React from 'react';
import { connect } from 'react-redux';
import { showAlert } from 'src/screens/app/redux/action';
import { updatePhoneNumberAction, submitPhoneCodeAction } from 'src/screens/auth/redux/action';
import { LabelLang } from 'src/lang/components';
// import valid from 'src/services/validate';
import PhoneForm from './PhoneForm';
import { getColorByLevel, getCurrentLevel, getStatusByLevel } from '../util';

// eslint-disable-next-line
const PhoneBlock = ({ style, msg, showAlert, phone_number, level, levelStatus, updatePhoneNumberAction, submitPhoneCodeAction }) => {
  const handleVerifyPhone = (values) => {

    const { phone: phoneNumberValue, code } = values;
    if (!code) {
      updatePhoneNumberAction(phoneNumberValue).then(()=>{
        showAlert({
          message: 'me.accountLevel.alert.sendPhoneCodeSuccess',
          timeOut: 3000,
          type: 'success',
        });
      }).catch((e)=>{
        if(e.code==='exceed_limit'){
          showAlert({
            message: 'me.accountLevel.alert.overSMSLimit',
            timeOut: 3000,
            type: 'danger',
          });
        }
        else{
          showAlert({
            message: 'me.accountLevel.alert.error',
            timeOut: 3000,
            type: 'danger',
          });
        }

      });
    } else {
      submitPhoneCodeAction(code).then(()=>{
        showAlert({
          message: 'me.accountLevel.alert.lv2',
          timeOut: 3000,
          type: 'success'
        });}).catch((e)=>{
        if(e.code==='invalid_verification'){
          showAlert({
            message: 'me.accountLevel.alert.invalidCode',
            timeOut: 3000,
            type: 'danger',
          });
        }
        else{
          showAlert({
            message: 'me.accountLevel.alert.error',
            timeOut: 3000,
            type: 'danger',
          });
        }

      });
    }
  };
  const currentLevel = getCurrentLevel(level, levelStatus);

  return (
    <div className={style.collapse_custom}>
      <div className={style.head}>
        <p className={style.label}>
          <LabelLang id="me.accountLevel.step2" />
        </p>
        <div className={style.extend}>
          <span className={`badge badge-${getColorByLevel(2, level, levelStatus)}`}>{getStatusByLevel(2, level, levelStatus)}</span>
        </div>
      </div>
      <div className={style.content}>
        <p className={style.text}><LabelLang id="me.accountLevel.wrm2" values={msg} /></p>
      </div>
      {1 <= currentLevel  && <PhoneForm onSubmit={handleVerifyPhone} />}
    </div>
  );
};

const mapState = state => ({
  phone_number: state.auth.profile?.phone_number || null,
  level: state.auth.profile.verification_level,
  levelStatus: state.auth.profile.verification_status,
});
const mapDispatch = { showAlert, updatePhoneNumberAction, submitPhoneCodeAction };
export default connect(mapState, mapDispatch)(PhoneBlock);
