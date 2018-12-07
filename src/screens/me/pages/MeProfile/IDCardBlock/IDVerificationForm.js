import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import isRequired from 'src/components/core/form/validator/isRequired';
import { reduxForm, Field } from 'redux-form';
import { Row, Button } from 'react-bootstrap';
import { InputField } from 'src/components/custom';
import { LabelLang, FieldLang } from 'src/lang/components';
import dropdownField from 'src/components/core/form/fields/dropdown';
import { FileUploadField } from 'src/components/fileUploader';
// import FileUploadField from 'src/components/fileUploader/FileUploadField';
import { DOC_TYPES, getReachingLevel } from '../util';

const required = isRequired();

// eslint-disable-next-line
class IDVerificationForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isPassport: props.initialValues.id_type === DOC_TYPES[0].value
    };
  }

  onSelectIdType = value => this.setState({ isPassport: value === DOC_TYPES[0].value });
  isRejected = () => {
    // eslint-disable-next-line
    const { level, levelStatus} = this.props;
    return level === 'level_3' && levelStatus === 'rejected';
  }
  render() {
    // eslint-disable-next-line
    const { initialValues, level, levelStatus, handleSubmit, onSubmit } = this.props;
    const { isPassport } = this.state;
    return (
      <div>
        <Row>
          <div className="col-12">
            <p className="text label">
              <LabelLang id="me.accountLevel.fullName" />
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
              <LabelLang id="me.accountLevel.documentType" />
            </p>
            <Field
              name="id_type"
              handleOnChange={this.onSelectIdType}
              component={dropdownField}
              list={DOC_TYPES}
            />
          </div>
          <div className="col-12">
            <p className="text label">
              <LabelLang id="me.accountLevel.documentNumber" />
            </p>
            <FieldLang
              name="id_number"
              component={InputField}
              validate={[required]}
              placeholder="me.accountLevel.documentNumber"
              disabled={getReachingLevel(level, levelStatus) >= 3}
            />
          </div>
          <div className="col-12">
            <p className="text label" style={{ textAlign: 'center', marginTop: '20px' }}>
              <LabelLang id="me.accountLevel.backPhoto" />
            </p>
            {(!initialValues.back_image || this.isRejected()) && (
              <Field name="back_image" component={FileUploadField} />
            )}
            {(initialValues.back_image && !this.isRejected()) && <img alt="back_image" style={{ width: '100%' }} src={initialValues.back_image} />}
          </div>
          {!isPassport && (
          <div className="col-12">
            <p className="text label" style={{ textAlign: 'center', marginTop: '20px' }}>
              <LabelLang id="me.accountLevel.frontPhoto" />
            </p>
            {(!initialValues.front_image || this.isRejected()) && (
              <Field name="front_image" component={FileUploadField} />
            )}
            {(initialValues.front_image && !this.isRejected()) && <img alt="front_image" style={{ width: '100%' }} src={initialValues.front_image} />}
          </div>)}
          {getReachingLevel(level, levelStatus) < 3 && (
          <div className="col-12" style={{ marginTop: '20px' }}>
            <Button onClick={handleSubmit(onSubmit)} variant="primary" size="lg" block>
              <LabelLang id="me.accountLevel.submit" />
            </Button>
          </div>)}
        </Row>
      </div>
    );
  }
}

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
