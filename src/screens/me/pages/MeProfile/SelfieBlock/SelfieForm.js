import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import { Row, Button } from 'react-bootstrap';
import { MyMessage } from 'src/lang/components';
import FileUploader from 'src/components/FileUploader';
import { getReachingLevel } from '../util';

// eslint-disable-next-line
const SelfieForm = ({ initialValues, level, levelStatus, handleSubmit, onSubmit, change }) => {
  const handleOnSuccess = (imgUrl) => change('selfie_image', imgUrl);
  const handleRemove = () => change('selfie_image', '');

  return (
    <div>
      <Row>
        <div className="col-12">
          <p className="text label" style={{ textAlign: 'center', marginTop: '20px' }}>
            <MyMessage id="Your Selfie Photo" />
          </p>
          {!initialValues.selfie_image && <FileUploader onSuccess={handleOnSuccess} onRemove={handleRemove} />}
          {initialValues.selfie_image && <img alt="selfie_image" src={initialValues.selfie_image} />}
        </div>
        {getReachingLevel(level, levelStatus) < 4 && (
        <div className="col-12">
          <Button onClick={handleSubmit(onSubmit)} variant="primary" size="lg" block>
            <MyMessage id="me.profile.text.id_verification.button.submit" />
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
