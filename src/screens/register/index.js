import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReCAPTCHA from 'react-google-recaptcha';
import createForm from 'src/components/core/form/createForm';
import { formValueSelector, change } from 'redux-form';
import {FieldLang} from 'src/lang/components';
import inputField from 'src/components/core/form/fields/input';
import { isEmail, isPassword, isRequired, mustChecked ,isNickName } from 'src/components/core/form/validator';
import { USER } from 'src/resources/constants/user';
import { URL } from 'src/resources/constants/url';
import LabelLang from 'src/lang/components/LabelLang';
import dropdownField from 'src/components/core/form/fields/dropdown';
import checkBoxField from 'src/components/core/form/fields/checkbox';
import cx from 'classnames';
import { showAlert } from 'src/screens/app/redux/action';
import { register, getCountries } from './action';
import style from './style.scss';

const RegisterForm = createForm({
  propsReduxForm: {
    form: 'RegisterForm',
    initialValues: {

    },
  },
});

const selectorForm = formValueSelector('RegisterForm');

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      registering: false,
      defaultCountry: '',
      countryList: []
    };
    this._reCaptchaRef = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userCountry !== this.props.userCountry) {
      this.props.countryBound('RegisterForm', 'country', this.props.userCountry);
    }
  }

  componentDidMount() {
    const { getCountriesBound } = this.props;
    getCountriesBound().then((res) => {
      const countries = res.map((item) => ({
        label: item.country_name,
        value: item.country
      }));

      this.setState({countryList: countries});
    });
  }

  handleSubmit() {
    this.setState({ registering: true });
    const {
      name, username, password, country, recaptchaValue, agreement
    } = this.props;
    if (name && username && password && country && recaptchaValue && agreement) {
      this.props.registerBound({
        name,
        username,
        password,
        country,
        recaptchaValue
      }).then((res) => {
        if (res === USER.REGISTER_SUCCESS) {
          console.log('Register successfully');
          this.props.showAlert({
            message: 'user.register.registerSuccessfully',
            timeOut: 5000,
          });
          this.props.history.push(URL.HOME);
        } else {
          if(res.data.message) {
            this.props.showAlert({
              message: res.data.message,
              type: 'danger',
              timeOut: 2000,
            });
          }
          else {
            this.props.showAlert({
              message: `user.register.${res.err.code}`,
              type: 'danger',
              timeOut: 2000,
            });
          }
        }

      }).finally(() => {
        this.setState({ registering: false });
      });
    }
  }

  verifyCallback(recaptchaToken) {
    this.props.reCapchatBound('RegisterForm', 'recaptchaValue', recaptchaToken);
  }

  render() {
    const { registering, countryList, defaultCountry} = this.state;
    const action = <Link target="_blank" to={URL.AGREEMENT}><LabelLang id='user.register.agreementAction' /></Link>;
    return (
      <div className={cx('container', style['register-warper'])}>
        <div className="row">
          <div className="col-sm-10 col-md-9 col-lg-7 mx-auto">
            <h5 className={cx(style.registerTitle, 'text-center')}><LabelLang id="user.register.title" /></h5>
            <div className={cx('card', style['register-card'])}>
              <div className="card-body">
                <RegisterForm onSubmit={this.handleSubmit} className="form-register">
                  <FieldLang
                    name="name"
                    containerClassName="form-group"
                    component={inputField}
                    validate={[isRequired(<LabelLang id="user.register.requiredNickName" />), isNickName(<LabelLang id="user.register.notValidNickName" />)]}
                    type="text"
                    className="form-control"
                    placeholder="user.register.placeholderNickName"
                  />
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
                    name="country"
                    className="form-control"
                    component={dropdownField}
                    validate={isRequired(<LabelLang id="user.register.requiredCountry" />)}
                    toggle={<LabelLang id="user.register.placeholderCountry" />}
                    value={defaultCountry}
                    list={countryList}
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
                    labelTextValues={{action}}
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
  name: selectorForm(state, 'name'),
  username: selectorForm(state, 'username'),
  password: selectorForm(state, 'password'),
  country: selectorForm(state, 'country'),
  recaptchaValue: selectorForm(state, 'recaptchaValue'),
  agreement: selectorForm(state, 'agreement'),
  userCountry: state.app?.userCountry,
});

const mapDispatch = dispatch => ({
  registerBound: bindActionCreators(register, dispatch),
  getCountriesBound: bindActionCreators(getCountries, dispatch),
  reCapchatBound: bindActionCreators(change, dispatch),
  countryBound: bindActionCreators(change, dispatch),
  showAlert: bindActionCreators(showAlert, dispatch),
});

const connectedRegisterPage = connect(mapStateToProps, mapDispatch)(RegisterPage);
export default connectedRegisterPage;
