import React from 'react';
import { WrapperLang } from 'src/lang/components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Row, Col }from 'react-bootstrap';
import { Button } from 'src/components/custom';
import { getLanguages } from 'src/screens/auth/redux/api';
import dropdownField from 'src/components/core/form/fields/dropdown';

// eslint-disable-next-line
class GeneralSettingForm extends React.Component {

  state = {
    languages: []
  }

  componentDidMount() {
    getLanguages().then(r => {
      const languages = Object.keys(r).map(value => ({ value, label: r[value] }));
      this.setState({ languages });
    }).catch(err =>err);
  }

  render() {
    // eslint-disable-next-line
    const { handleSubmit, onSubmit } = this.props;
    const { languages } = this.state;
    return (
      <form style={{ width: '100%' }}>
        <Field
          name="language"
          component={dropdownField}
          list={languages}
        />
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
  }
}

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
