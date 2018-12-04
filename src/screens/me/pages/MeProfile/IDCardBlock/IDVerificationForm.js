import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form';
import { Row, Button } from 'react-bootstrap';
import { InputField } from 'src/components/custom';
import { LabelLang, FieldLang } from 'src/lang/components';
import dropdownField from 'src/components/core/form/fields/dropdown';
import FileUploader from 'src/components/fileUploader';
import { DOC_TYPES, getReachingLevel } from '../util';

const required = value => (value || typeof value === 'number' ? undefined : 'Required');

// eslint-disable-next-line
class IDVerificationForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isPassport: props.initialValues.id_type === DOC_TYPES[0].value
    };
  }

  handleBackSuccess = (imgUrl) => this.props.change('back_image', imgUrl);
  handleFrontSuccess = (imgUrl) => this.props.change('front_image', imgUrl);
  backRemove = () => this.props.change('back_image', '');
  frontRemove = () => this.props.change('front_image', '');
  onSelectIdType = value => this.setState({ isPassport: value === DOC_TYPES[0].value });
  render() {
    // eslint-disable-next-line
    const { initialValues, level, levelStatus, handleSubmit, onSubmit } = this.props;
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
            {!initialValues.back_image && <FileUploader onSuccess={this.handleBackSuccess} onRemove={this.backRemove} />}
            {initialValues.back_image && <img alt="back_image" style={{ width: '100%' }} src={initialValues.back_image} />}
          </div>
          {!this.state.isPassport && (
          <div className="col-12">
            <p className="text label" style={{ textAlign: 'center', marginTop: '20px' }}>
              <LabelLang id="me.accountLevel.frontPhoto" />
            </p>
            {!initialValues.front_image && <FileUploader onSuccess={this.handleFrontSuccess} onRemove={this.frontRemove} />}
            {initialValues.front_image && <img alt="front_image" style={{ width: '100%' }} src={initialValues.front_image} />}
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
