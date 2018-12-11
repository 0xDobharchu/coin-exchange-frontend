import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { Row, Button } from 'react-bootstrap';
import { LabelLang } from 'src/lang/components';
import { FileUploadField } from 'src/components/fileUploader';
import { getReachingLevel } from '../util';

// eslint-disable-next-line
const SelfieForm = ({ initialValues, level, levelStatus, handleSubmit, onSubmit, change }) => {
  const isRejected = () => level === 'level_4' && levelStatus === 'rejected';
  return (
    <div>
      <Row>
        <div className="col-12">
          <p className="text label" style={{ textAlign: 'center', marginTop: '20px' }}>
            <LabelLang id="me.accountLevel.selfiePhoto" />
          </p>
          {(!initialValues.selfie_image || isRejected()) && (
            <Field name="selfie_image" component={FileUploadField} />
          )}
          {(initialValues.selfie_image && !isRejected()) && <img alt="selfie_image" style={{ width: '100%' }} src={initialValues.selfie_image} />}
        </div>
        {getReachingLevel(level, levelStatus) < 4 && (
        <div className="col-12" style={{ marginTop: '20px' }}>
          <Button onClick={handleSubmit(onSubmit)} variant="primary" size="lg" block>
            <LabelLang id="me.accountLevel.submit" />
          </Button>
        </div>)}
      </Row>
    </div>);
};

const mapState = state => ({
  initialValues: {
    selfie_image: state.auth.profile.selfie_image,
  },
  level: state.auth.profile.verification_level,
  levelStatus: state.auth.profile.verification_status,
});
export default compose(
  connect(mapState),
  reduxForm({
    form: 'SelfieForm',
  })
)(SelfieForm);
