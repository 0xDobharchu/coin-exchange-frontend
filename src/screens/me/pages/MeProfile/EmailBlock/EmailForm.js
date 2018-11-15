import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import { Row } from 'react-bootstrap';
// import { FieldLang } from 'src/lang/components';
import { MyMessage, FieldLang } from 'src/lang/components';
import style from '../styles.scss';

// eslint-disable-next-line
const EmailForm = ({ handleSubmit, onSubmit }) => (
  <div>
    <Row>
      <div className="col-10">
        <FieldLang
          name="email"
          component="input"
          type="text"
          placeholder="me.profile.text.email.desc3"
          style={{ width: '100%' }}
        />
      </div>
      <div className="col-2" style={{ paddingLeft: 0 }}>
        <button onClick={handleSubmit(onSubmit)} type="button" className={style.submit_btn}>
          <MyMessage id="me.profile.text.email.button.send" />
        </button>
      </div>
    </Row>
  </div>
);

const mapState = state => ({
  initialValues: {
    email: state.auth.profile.email
  }
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
