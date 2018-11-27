import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import { Row } from 'react-bootstrap';
// import { FieldLang } from 'src/lang/components';
import { MyMessage, FieldLang } from 'src/lang/components';
import { getCurrentLevel } from '../util';
import style from '../styles.scss';

// eslint-disable-next-line
const PhoneForm = ({ handleSubmit, onSubmit, level, levelStatus }) => (
  <div>
    <Row>
      <div className="col-10">
        <FieldLang
          name="phone"
          component="input"
          type="text"
          placeholder="me.profile.text.phone.desc3"
          disabled={getCurrentLevel(level, levelStatus) >= 2}
          style={{ width: '100%' }}
        />
      </div>
      <div className="col-2" style={{ paddingLeft: 0 }}>
        <button onClick={handleSubmit(onSubmit)} type="button" className={style.submit_btn}>
          <MyMessage id="me.profile.text.email.button.send" />
        </button>
      </div>
      {level === 'level_2' && levelStatus === 'pending' && <div className="col-12" style={{ marginTop: '20px' }}><FieldLang name="code" component="input" type="text" placeholder="me.profile.text.phone.desc3" /></div>}
    </Row>
  </div>
);
const mapState = state => ({
  initialValues: {
    phone: state.auth.profile.phone_number,
  },
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
