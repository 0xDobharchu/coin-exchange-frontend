import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import { Row } from 'react-bootstrap';
// import { FieldLang } from 'src/lang/components';
import { LabelLang, FieldLang } from 'src/lang/components';
// import ReactPhoneInput from 'react-phone-input-2';

import style from '../styles.scss';
import {getReachingLevel} from '../util';

// const renderFieldPhone = ({ input }) => (
//   <ReactPhoneInput {...input} defaultCountry='hk' regions='asia' placeholder="me.profile.text.phone.desc3" inputStyle={{ width: '100%' }} />
// );

// eslint-disable-next-line
const PhoneForm = ({ handleSubmit, onSubmit, level, levelStatus }) => {
  // const handleOnChange = (values) => {
  //   change('phone', values);
  //   console.log(values);
  // };
  let CountryPhone = require('src/components/Phone/index').default;
  return (
    <div>
      <Row>
        <div className="col-10">
          {/* <ReactPhoneInput name='phone' value={phoneNumber} defaultCountry='hk' onChange={handleOnChange} regions='asia' placeholder="me.profile.text.phone.desc3" inputStyle={{ width: '100%' }} disabled={level === 'level_2' || level === 'level_3' || level === 'level_4'} /> */}
          {/* <FieldLang name="phone" component={renderFieldPhone} disabled={getReachingLevel(level, levelStatus) >= 2} />*/}
          {<CountryPhone name='phone' defaultCountry='hk' regions='asia' inputStyle={{ width: '100%' }} disabled={getReachingLevel(level, levelStatus) > 2 || (getReachingLevel(level, levelStatus) === 2 && levelStatus === 'approved')} /> }

        </div>
        {level === 'level_2' && levelStatus === 'pending' && <div className="col-10" style={{ width: '100%' }}><FieldLang style={{ width: '100%' }} name="code" component="input" type="text" placeholder="me.profile.text.phone.desc3" /></div>}
        <div className="col-2" style={{ paddingLeft: 0 }}>
          <button onClick={handleSubmit(onSubmit)} type="button" className={style.submit_btn} disabled={getReachingLevel(level, levelStatus) > 2 || (getReachingLevel(level, levelStatus) === 2 && levelStatus === 'approved')}>
            <LabelLang id="me.accountLevel.ok" />
          </button>
        </div>
      </Row>
    </div>
  );
};

const mapState = state => ({
  initialValues: {
    phone: state.auth.profile.phone_number || state.auth.profile.pending_phone_number,

  },
  level: state.auth.profile.verification_level,
  levelStatus: state.auth.profile.verification_status,
});
export default compose(
  connect(mapState),
  reduxForm({
    form: 'PhoneForm',
  })
)(PhoneForm);
