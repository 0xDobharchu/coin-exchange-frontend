import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import { Row } from 'react-bootstrap';
// import { FieldLang } from 'src/lang/components';
import { MyMessage, FieldLang } from 'src/lang/components';
import style from '../styles.scss';

// eslint-disable-next-line
const EmailForm = ({ handleSubmit, onSubmit,level, levelStatus  }) => (
  <div>
    <Row>
      <div className="col-10">
        <FieldLang
          name="email"
          component="input"
          type="text"
          placeholder="me.profile.text.email.desc3"
          disabled="true"
          style={{ width: '100%' }}
        />
      </div>{level === 'level_1' && levelStatus === 'pending' && <div className="col-2" style={{ paddingLeft: 0 }}><button onClick={handleSubmit(onSubmit)} type="button" className={style.submit_btn}><MyMessage id="me.profile.text.email.button.send" /></button></div>
        }
    </Row>
  </div>
);
const mapState = state => ({
  initialValues: {
    email: state.auth.profile.email
  },
  level: state.auth.profile.verification_level,
  levelStatus: state.auth.profile.verification_status,
});
export default compose(
  connect(mapState),
  reduxForm({
    form: 'EmailForm',
    // validate,
    // warn,
    // enableReinitialize: true,
  })
)(EmailForm);
