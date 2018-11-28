import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import { Row } from 'react-bootstrap';
// import { FieldLang } from 'src/lang/components';
import { MyMessage, FieldLang } from 'src/lang/components';
// import ReactPhoneInput from 'react-phone-input-2';

import style from '../styles.scss';

// eslint-disable-next-line
const PhoneForm = ({ handleSubmit, onSubmit, level, levelStatus ,phoneNumber}) => (
  <div>
    <Row>
      <div className="col-10">
        {/*<ReactPhoneInput value={phoneNumber} defaultCountry='hk' onChange={handleOnChange} regions='asia' placeholder="me.profile.text.phone.desc3" inputStyle={{ width: '100%' }} disabled={level === 'level_2' || level === 'level_3' || level === 'level_4'} />*/}
      </div>
      {level === 'level_2' && levelStatus === 'pending' && <div className="col-10" style={{ width: '100%' }}><FieldLang style={{ width: '100%' }} name="code" component="input" type="text" placeholder="me.profile.text.phone.desc3" /></div>}
      <div className="col-2" style={{ paddingLeft: 0 }}>
        <button onClick={handleSubmit(onSubmit)} type="button" className={style.submit_btn}>
          <MyMessage id="me.profile.text.email.button.send" />
        </button>
      </div>
    </Row>
  </div>
);

function handleOnChange(value) {
  console.log(value);
}
const mapState = state => ({
  initialValues: {
    phone: state.auth.profile.phone_number,
  },
  phoneNumber: state.auth.profile.phone_number,
  level: state.auth.profile.verification_level,
  levelStatus: state.auth.profile.verification_status,
});
export default compose(
  connect(mapState),
  reduxForm({
    form: 'PhoneForm',
    // validate,
    // warn,
    // enableReinitialize: true,
  })
)(PhoneForm);
