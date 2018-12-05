import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {reduxForm} from 'redux-form';
// import { FieldLang } from 'src/lang/components';
import { LabelLang, FieldLang } from 'src/lang/components';
// import ReactPhoneInput from 'react-phone-input-2';

import style from '../styles.scss';
import { getReachingLevel } from '../util';

// eslint-disable-next-line
const PhoneForm = ({ handleSubmit, onSubmit, level, levelStatus, state }) => {
  // const handleOnChange = (values) => {
  //   change('phone', values);
  //   console.log(values);
  // };
  let CountryPhone = require('src/components/Phone/index').default;
  const isSendPhoneCode = (level === 'level_2' && levelStatus === 'pending');
  const isPassLevel2 = (getReachingLevel(level, levelStatus) > 2 || (getReachingLevel(level, levelStatus) === 2 && levelStatus === 'approved'));
  const  handleChange=(e) =>{

    if(e.target.value)
      state.form.PhoneForm.initial.isButtonDisable = false;
    else
      state.form.PhoneForm.initial.isButtonDisable = true;

  };
  return (
    <div>
      <div className="row">
        <div className="col-10">
          {<CountryPhone
            name='phone'
            defaultCountry='hk'
            regions='asia'
            inputStyle={{ width: '100%' }}
            disabled={isPassLevel2}
          /> }
        </div>
        {isSendPhoneCode && (
          <div className="col-2" style={{ paddingLeft: 0}}>
            <button
              onClick={handleSubmit(onSubmit)}
              type="button"
              disabled={!state.form?.PhoneForm?.initial.isButtonDisable}
              className={style.submit_btn}
            >
              <LabelLang id="me.accountLevel.resend" />
            </button>
          </div>
        )}

        {!isSendPhoneCode && (
          <div className="col-2" style={{ paddingLeft: 0}}>
            <button
              onClick={handleSubmit(onSubmit)}
              type="button"
              className={style.submit_btn}
              disabled={isPassLevel2}
            >
              <LabelLang id="me.accountLevel.ok" />
            </button>
          </div>
        )}
      </div>
      <div className="row">
        {isSendPhoneCode && (
          <div className="col-10" style={{ width: '100%', marginTop: '20px' }}>
            <FieldLang style={{ width: '100%' }} name="code" component="input" type="text" placeholder="me.accountLevel.phoneCode" onChange={handleChange} />
          </div>)}
        {isSendPhoneCode && (
          <div className="col-2" style={{ paddingLeft: 0,marginTop: '20px'  }}>
            <button
              disabled={state.form?.PhoneForm?.initial.isButtonDisable}
              onClick={
                handleSubmit(onSubmit)
              }
              type="button"
              className={style.submit_btn}
            >
              <LabelLang id="me.accountLevel.ok" />
            </button>
          </div>)}

      </div>
    </div>
  );
};

const mapState = state => ({
  initialValues: {
    phone: state.auth.profile.phone_number || state.auth.profile.pending_phone_number,
    isButtonDisable: true,
  },
  level: state.auth.profile.verification_level,
  levelStatus: state.auth.profile.verification_status,
  state: state,
});
export default compose(
  connect(mapState),
  reduxForm({
    form: 'PhoneForm',
  })
)(PhoneForm);
