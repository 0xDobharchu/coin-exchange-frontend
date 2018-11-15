import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReCAPTCHA from 'react-google-recaptcha';
import createForm from 'src/components/core/form/createForm';
import { Field, formValueSelector, change } from 'redux-form';
import inputField from 'src/components/core/form/fields/input';
import { isEmail, isPassword, isConfirmPassword, isRequired } from 'src/components/core/form/validator';
import { USER } from 'src/resources/constants/user';
import LabelLang from 'src/lang/components/LabelLang';
import dropdownField from 'src/components/core/form/fields/dropdown';
import { injectIntl } from 'react-intl';
import { register } from './action';

const RegisterForm = createForm({
  propsReduxForm: {
    form: 'RegisterForm',
    initialValues: {
      input: '',
    },
  },
});

const selectorForm = formValueSelector('RegisterForm');

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      registering: false,
    };
    this._reCaptchaRef = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
  }

  handleSubmit() {
    this.setState({ registering: true });
    const {
      firstName, lastName, username, password, confirmPassword, country, recaptchaValue
    } = this.props;
    if (firstName && lastName && username && password && confirmPassword && country && recaptchaValue) {
      this.props.registerBound({
        first_name: firstName,
        last_name: lastName,
        username,
        password,
        country,
        recaptchaValue
      }).then((res) => {
        if (res === USER.REGISTER_SUCCESS) {
          console.log('Register successfull');
          this.props.history.push('/login');
        }
      }).finally(() => {
        this.setState({ registering: false });
      });
    }
  }

  verifyCallback(recaptchaToken) {
    console.log(recaptchaToken, '<= your recaptcha token');
    this.props.reCapchatBound('RegisterForm', 'recaptchaValue', recaptchaToken);
  }

  render() {
    const { registering } = this.state;
    return (
      <div className="row justify-content-md-center">
        <div className="col-md-6">
          <h2><LabelLang id="user.register.title" /></h2>
          <RegisterForm onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName"><LabelLang id="user.register.firstName" /></label>
              <Field
                name="firstName"
                className="form-control"
                component={inputField}
                validate={isRequired(<LabelLang id="user.register.requiredFirstName" />)}
                type="text"
                placeholder={this.props.intl.formatMessage({ id: 'user.register.placeholderFirstName' })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName"><LabelLang id="user.register.firstName" /></label>
              <Field
                name="lastName"
                className="form-control"
                component={inputField}
                validate={isRequired(<LabelLang id="user.register.requiredLastName" />)}
                type="text"
                placeholder={this.props.intl.formatMessage({ id: 'user.register.placeholderLastName' })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="username"><LabelLang id="user.register.username" /></label>
              <Field
                name="username"
                className="form-control"
                component={inputField}
                validate={[isRequired(<LabelLang id="user.register.requiredUsername" />), isEmail(<LabelLang id="user.register.notValidUsername" />)]}
                type="email"
                placeholder="email@coinbowls.com"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password"><LabelLang id="user.register.password" /></label>
              <Field
                name="password"
                className="form-control"
                component={inputField}
                validate={[isRequired(<LabelLang id="user.register.requiredPassword" />), isPassword(8, <LabelLang id="user.register.notValidPassword" />)]}
                type="password"
                placeholder={this.props.intl.formatMessage({ id: 'user.register.placeholderPassword' })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword"><LabelLang id="user.register.confirmPassword" /></label>
              <Field
                name="confirmPassword"
                className="form-control"
                component={inputField}
                validate={[(value, values) => isConfirmPassword(values.password)(value)]}
                type="password"
                placeholder={this.props.intl.formatMessage({ id: 'user.register.placeholderConfirmPassword' })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="country"><LabelLang id="user.register.country" /></label>
              <Field
                name="country"
                className="form-control"
                component={dropdownField}
                toggle={<LabelLang id="user.register.placeholderCountry" />}
                list={[
                  {
                    label: 'Philippines',
                    value: 'PH'
                  },
                  {
                    label: 'Indonesia',
                    value: 'IN'
                  }
                ]}
              />
            </div>
            <div className="form-group">
              <ReCAPTCHA
                style={{ display: 'inline-block' }}
                ref={this._reCaptchaRef}
                sitekey={APP_ENV.GOOGLE_CAPTCH_SITE_KEY}
                onChange={this.verifyCallback}
              />
              <Field
                name="recaptchaValue"
                className="form-control"
                component={inputField}
                validate={isRequired(<LabelLang id="user.register.notValidReCaptcha" />)}
                type="hidden"
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary"><LabelLang id="user.register.registerButton" /></button>
              {registering
                        && <img alt="is register" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
              <Link to="/login" className="btn btn-link"><LabelLang id="user.register.loginButton" /></Link>
            </div>
          </RegisterForm>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  firstName: selectorForm(state, 'firstName'),
  lastName: selectorForm(state, 'lastName'),
  username: selectorForm(state, 'username'),
  password: selectorForm(state, 'password'),
  confirmPassword: selectorForm(state, 'confirmPassword'),
  country: selectorForm(state, 'country'),
  recaptchaValue: selectorForm(state, 'recaptchaValue'),
});

const mapDispatch = dispatch => ({
  registerBound: bindActionCreators(register, dispatch),
  reCapchatBound: bindActionCreators(change, dispatch),
});

const connectedRegisterPage = connect(mapStateToProps, mapDispatch)(RegisterPage);
export default injectIntl(connectedRegisterPage);
