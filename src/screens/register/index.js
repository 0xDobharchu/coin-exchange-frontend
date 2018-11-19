import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReCAPTCHA from 'react-google-recaptcha';
import createForm from 'src/components/core/form/createForm';
import { formValueSelector, change } from 'redux-form';
import { FieldLang } from 'src/lang/components';
import inputField from 'src/components/core/form/fields/input';
import { isEmail, isPassword, isConfirmPassword, isRequired, mustChecked } from 'src/components/core/form/validator';
import { USER } from 'src/resources/constants/user';
import { URL } from 'src/resources/constants/url';
import LabelLang from 'src/lang/components/LabelLang';
import dropdownField from 'src/components/core/form/fields/dropdown';
import checkBoxField from 'src/components/core/form/fields/checkbox';
import cx from 'classnames';
import { register } from './action';
import style from './style.scss';

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
      firstName, lastName, username, password, confirmPassword, country, recaptchaValue, agreement
    } = this.props;
    if (firstName && lastName && username && password && confirmPassword && country && recaptchaValue && agreement) {
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
          this.props.history.push(URL.USER_SIGN_IN);
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
      <div className={cx('container', style['register-warper'])}>
        <div className="row">
          <div className="col-sm-10 col-md-9 col-lg-7 mx-auto">
            <h5 className={cx(style.registerTitle, 'text-center')}><LabelLang id="user.register.title" /></h5>
            <div className={cx('card', style['register-card'])}>
              <div className="card-body">
                <RegisterForm onSubmit={this.handleSubmit} className="form-register">
                  <div className="form-row">
                    <FieldLang
                      name="firstName"
                      containerClassName="form-group col-md-6 col-sm-6"
                      component={inputField}
                      validate={isRequired(<LabelLang id="user.register.requiredFirstName" />)}
                      type="text"
                      className="form-control"
                      placeholder="user.register.placeholderFirstName"
                    />
                    <FieldLang
                      name="lastName"
                      containerClassName="form-group col-md-6 col-sm-6"
                      component={inputField}
                      validate={isRequired(<LabelLang id="user.register.requiredLastName" />)}
                      type="text"
                      className="form-control"
                      placeholder="user.register.placeholderLastName"
                    />
                  </div>
                  <FieldLang
                    name="username"
                    containerClassName="form-group"
                    component={inputField}
                    validate={[isRequired(<LabelLang id="user.register.requiredUsername" />), isEmail(<LabelLang id="user.register.notValidUsername" />)]}
                    type="email"
                    className='form-control'
                    placeholder="user.register.username"
                  />
                  <FieldLang
                    containerClassName="form-group"
                    name="password"
                    className="form-control"
                    component={inputField}
                    validate={[isRequired(<LabelLang id="user.register.requiredPassword" />), isPassword(8)]}
                    type="password"
                    placeholder="user.register.password"
                  />
                  <FieldLang
                    containerClassName="form-group"
                    name="confirmPassword"
                    className="form-control"
                    component={inputField}
                    validate={[(value, values) => isConfirmPassword(values.password)(value)]}
                    type="password"
                    placeholder="user.register.placeholderConfirmPassword"
                  />
                  <FieldLang
                    containerClassName="form-group"
                    name="country"
                    className="form-control"
                    component={dropdownField}
                    validate={isRequired(<LabelLang id="user.register.requiredCountry" />)}
                    toggle={<LabelLang id="user.register.placeholderCountry" />}
                    list={[
                      {
                        key: 'PH',
                        label: 'Philippines',
                        value: 'PH'
                      },
                      {
                        key: 'IN',
                        label: 'Indonesia',
                        value: 'IN'
                      }
                    ]}
                  />
                  <div className="form-group">
                    <ReCAPTCHA
                      ref={this._reCaptchaRef}
                      sitekey={APP_ENV.GOOGLE_CAPTCH_SITE_KEY}
                      size="normal"
                      badge="inline"
                      onChange={this.verifyCallback}
                    />
                    <FieldLang
                      name="recaptchaValue"
                      className="form-control"
                      component={inputField}
                      validate={isRequired(<LabelLang id="user.register.notValidReCaptcha" />)}
                      type="hidden"
                    />
                  </div>
                  <FieldLang
                    containerClassName="form-group"
                    name="agreement"
                    id="agreement"
                    component={checkBoxField}
                    type="checkbox"
                    validate={mustChecked(<LabelLang id="user.register.requiredAgreement" />, true)}
                    className="form-check-input"
                    labelText="user.register.agreement"
                  />
                  <div className="form-group">
                    <button type="submit" className={cx('btn btn-primary btn-block', style.buttonRegister, registering ? 'disabled': '')}><LabelLang id="user.register.registerButton" /></button>
                  </div>
                </RegisterForm>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center">
            <Link to={URL.USER_SIGN_IN} className={cx('btn btn-link', style.link)}><LabelLang id="user.register.loginButton" /></Link>
          </div>
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
  agreement: selectorForm(state, 'agreement'),
});

const mapDispatch = dispatch => ({
  registerBound: bindActionCreators(register, dispatch),
  reCapchatBound: bindActionCreators(change, dispatch),
});

const connectedRegisterPage = connect(mapStateToProps, mapDispatch)(RegisterPage);
export default connectedRegisterPage;
