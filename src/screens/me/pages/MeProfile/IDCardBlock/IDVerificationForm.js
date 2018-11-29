import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form';
import { Row, Button } from 'react-bootstrap';
import { InputField } from 'src/components/custom';
import { MyMessage, FieldLang } from 'src/lang/components';
import dropdownField from 'src/components/core/form/fields/dropdown';
import FileUploader from 'src/components/fileUploader';
import { DOC_TYPES, getReachingLevel } from '../util';

const required = value => (value || typeof value === 'number' ? undefined : 'Required');

const DropDownField = () => (
  <Field
    name="id_type"
    component={dropdownField}
    list={DOC_TYPES}
  />
);

// eslint-disable-next-line
const IDVerificationForm = ({ initialValues, level, levelStatus, handleSubmit, onSubmit, change }) => {
  const handleBackSuccess = (imgUrl) => change('back_image', imgUrl);
  const handleFrontSuccess = (imgUrl) => change('front_image', imgUrl);
  const backRemove = () => change('back_image', '');
  const frontRemove = () => change('front_image', '');

  return (
    <div>
      <Row>
        <div className="col-12">
          <p className="text label">
            <MyMessage id="me.accountLevel.fullName" />
          </p>
          <FieldLang
            name="id_name"
            component={InputField}
            validate={[required]}
            placeholder="me.accountLevel.fullNameDesc"
            disabled={getReachingLevel(level, levelStatus) >= 3}
          />
        </div>
        <div className="col-12">
          <p className="text label">
            <MyMessage id="me.accountLevel.documentType" />
          </p>
          <DropDownField />
        </div>
        <div className="col-12">
          <p className="text label">
            <MyMessage id="me.accountLevel.documentNumber" />
          </p>
          <FieldLang
            name="id_number"
            component={InputField}
            validate={[required]}
            placeholder="me.accountLevel.documentNumber"
            disabled={getReachingLevel(level, levelStatus) >= 3}
          />
        </div>
        <div className="col-6">
          <p className="text label" style={{ textAlign: 'center', marginTop: '20px' }}>
            <MyMessage id="me.accountLevel.backPhoto" />
          </p>
          {!initialValues.back_image && <FileUploader onSuccess={handleBackSuccess} onRemove={backRemove} />}
          {initialValues.back_image && <img alt="back_image" src={initialValues.back_image} />}
        </div>
        <div className="col-6">
          <p className="text label" style={{ textAlign: 'center', marginTop: '20px' }}>
            <MyMessage id="me.accountLevel.frontPhoto" />
          </p>
          {!initialValues.front_image && <FileUploader onSuccess={handleFrontSuccess} onRemove={frontRemove} />}
          {initialValues.front_image && <img alt="front_image" src={initialValues.front_image} />}
        </div>
        {getReachingLevel(level, levelStatus) < 3 && (
        <div className="col-12">
          <Button onClick={handleSubmit(onSubmit)} variant="primary" size="lg" block>
            <MyMessage id="me.accountLevel.submit" />
          </Button>
        </div>)}
      </Row>
    </div>);
};

const mapState = state => ({
  initialValues: {
    id_name: state.auth.profile.id_name,
    id_type: state.auth.profile.id_type || 'passport',
    id_number: state.auth.profile.id_number,
    back_image: state.auth.profile.back_image,
    front_image: state.auth.profile.front_image
  },
  level: state.auth.profile.verification_level,
  levelStatus: state.auth.profile.verification_status,
});
export default compose(
  connect(mapState),
  reduxForm({
    form: 'IDVerificationForm',
    // validate,
    // warn,
    // enableReinitialize: true,
  })
)(IDVerificationForm);
