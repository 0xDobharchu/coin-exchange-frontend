import React from 'react';
// import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form';
import { Row, Button } from 'react-bootstrap';
import { MyMessage, FieldLang } from 'src/lang/components';
import dropdownField from 'src/components/core/form/fields/dropdown';

const DOC_TYPES = [
  {
    label: 'Passport',
    value: 'PASSPORT',
  }, 
  {
    label: 'Driver License',
    value: 'DRIVER_LICENSE'
  },
  {
    label: 'Government ID Card',
    value: 'ID_CARD'
  },
];

const DropDownField = () => (
  <Field
    name="documentType"
    component={dropdownField}
    // validate={dropdownValidator()}
    // toggle={<b>Click me</b>}
    list={DOC_TYPES}
  />
);

// eslint-disable-next-line
const IDVerificationForm = ({ handleSubmit, onSubmit }) => (
  <div>
    <Row>
      <div className="col-12">
        <p className="text label">
          <MyMessage id="me.profile.text.id_verification.desc2" />
        </p>
        <FieldLang
          name="fullname"
          component="input"
          type="text"
          placeholder="me.profile.verify.alert.notValid.idVerification.invalidFullName"
          style={{ width: '100%' }}
        />
      </div>
      <div className="col-12">
        <p className="text label">
          <MyMessage id="me.profile.text.id_verification.desc4" />
        </p>
        <DropDownField />
      </div>
      <div className="col-12">
        <p className="text label">
          <MyMessage id="me.profile.text.id_verification.desc3" />
        </p>
        <FieldLang
          name="idNumber"
          component="input"
          type="text"
          placeholder="me.profile.text.id_verification.desc3"
          style={{ width: '100%' }}
        />
      </div>
      <div className="col-12">
        <Button onClick={handleSubmit(onSubmit)} variant="primary" size="lg" block>
          <MyMessage id="me.profile.text.id_verification.button.submit" />
        </Button>
      </div>
    </Row>
  </div>
);

// const mapState = state => ({
//   initialValues: {
//     documentType: 0
//   }
// });
export default compose(
  // connect(mapState),
  reduxForm({
    form: 'IDVerificationForm',
    initialValues: {
      documentType: 'PASSPORT',
    }
    // validate,
    // warn,
    // enableReinitialize: true,
  })
)(IDVerificationForm);
