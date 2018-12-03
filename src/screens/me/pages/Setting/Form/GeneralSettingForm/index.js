import React from 'react';
import { WrapperLang } from 'src/lang/components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Row, Col }from 'react-bootstrap';
import { Button } from 'src/components/custom';
import { LanguageField } from '../../Language';

// eslint-disable-next-line
const GeneralSettingForm = ({ handleSubmit, onSubmit }) => (
  <form style={{ width: '100%' }}>
    <LanguageField />
    <Row style={{ padding: '5px', marginTop: '10px' }}>
      <Col md={9} />
      <Col md={3}>
        <WrapperLang>
          {ts =>
            <Button onClick={handleSubmit(onSubmit)} value={ts('me.accountInfo.save')} />
          }
        </WrapperLang>
      </Col>
    </Row>
  </form>
);

const mapState = state => ({
  initialValues: {
    language: state.auth.profile.language
  }
});


export default compose(
  connect(mapState),
  reduxForm({
    form: 'GeneralSettingForm',
  })
)(GeneralSettingForm);
