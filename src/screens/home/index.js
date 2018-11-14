import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import photo from 'src/assets/images/ninja-header-black.svg';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/lib/Container';
import { MdHome } from 'react-icons/md';
import createForm from 'src/components/core/form/createForm';
import inputField, { inputValidator } from 'src/components/core/form/fields/input';
import textareaField, { textareaValidator } from 'src/components/core/form/fields/textarea';
import dropdownField, { dropdownValidator } from 'src/components/core/form/fields/dropdown';
import { Field } from 'redux-form';
import { mount, testGetDataAsyncWithDispatch, testGetDataAsyncShorthand } from './action';
import style from './style.scss';

const Form = createForm({
  propsReduxForm: {
    form: 'TestForm',
    initialValues: {
      input: 'Input test',
      textarea: 'Textarea test',
      dropdown: 1,
    },
  },
});
class Home extends Component {
  componentWillMount() {
    const { mountBound, testGetDataAsyncWithDispatchBound, testGetDataAsyncShorthandBound } = this.props;
    mountBound();
    testGetDataAsyncWithDispatchBound('json').then(res => console.log('testGetDataAsyncWithDispatch view', res));
    testGetDataAsyncShorthandBound('json').then(res => console.log('testGetDataAsyncShorthand view', res));
  }

  render() {
    const { time } = this.props;
    return (
      <Container className={`common-container ${style.container}`}>
        <h1>
          <MdHome />
          {this.props.title || 'Home'}
        </h1>
        <span>
          This was rendered on
          {__CLIENT__ && 'Client'}
          {__SERVER__ && 'Server'}
        </span>
        <span>
          Time
          { new Date(time).toISOString() }
        </span>
        <Link to="contact">Contact</Link>
        <Link to="login">Login</Link>
        <Link to="localization">Localization</Link>
        <Link to="me">Localization</Link>
        <img className={style.photo} src={photo} alt="" />
        <Form>
          <Field
            name="input"
            component={inputField}
            validate={inputValidator}
            type="number"
            /** other input props... */
          />
          <Field
            name="textarea"
            component={textareaField}
            validate={textareaValidator}
            placeholder="OK"
            /** other textarea props... */
          />
          <Field
            name="dropdown"
            component={dropdownField}
            validate={dropdownValidator}
            toggle={<b>Click me</b>}
            list={[
              {
                label: 'Text 1',
                onClick: () => alert(1),
                value: 1
              },
              {
                label: 'Text 2',
                onClick: () => alert(2),
                value: 2
              }
            ]}
          />
        </Form>
      </Container>
    );
  }
}

const mapState = state => ({ time: state?.homeReducer?.time });

const mapDispatch = dispatch => ({
  mountBound: bindActionCreators(mount, dispatch),
  testGetDataAsyncWithDispatchBound: bindActionCreators(testGetDataAsyncWithDispatch, dispatch),
  testGetDataAsyncShorthandBound: bindActionCreators(testGetDataAsyncShorthand, dispatch),
});

Home.defaultProps = {
  time: new Date(),
};
Home.propTypes = {
  mountBound: PropTypes.func.isRequired,
  time: PropTypes.object,
};

export default connect(mapState, mapDispatch)(Home);
