import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import createForm from 'src/components/core/form/createForm';
import { formValueSelector } from 'redux-form';
import {FieldLang} from 'src/lang/components';
import inputField from 'src/components/core/form/fields/input';
import checkBoxField from 'src/components/core/form/fields/checkbox';
import { isEmail, isPassword, isRequired } from 'src/components/core/form/validator';
import { USER } from 'src/resources/constants/user';
import LabelLang from 'src/lang/components/LabelLang';
import { URL } from 'src/resources/constants/url';
import cx from 'classnames';
import { showAlert } from 'src/screens/app/redux/action';
import currentUser from 'src/utils/authentication';
import { login } from './action';
import style from './style.scss';

const LoginForm = createForm({
  propsReduxForm: {
    form: 'LoginForm',
  },
});

const selectorForm = formValueSelector('LoginForm');

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggingIn: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);

    if(currentUser.isLogin()) {
      this.redirectTo();
    }
  }

  redirectTo() {
    let redirectTo =  URL.HOME;
    if( this.props.location.state && this.props.location.state.from){
      redirectTo = this.props.location.state.from.pathname;
    }
    this.props.history.push(redirectTo);
  }

  handleSubmit() {
    this.setState({ loggingIn: true });
    const { username, password } = this.props;
    if (username && password) {
      this.props.loginBound(username, password).then((res) => {
        if (res.type === USER.LOGIN_SUCCESS) {
          this.redirectTo();
          if(res.message === true) {
            const action = <Link to={URL.ME}><LabelLang id="user.login.warningVerifyNow" /></Link>;
            this.props.showAlert({
              message: 'user.login.warningVerify',
              values: {action},
              timeOut: 5000,
            });
          }
        } else if (res.type === USER.LOGIN_FAILURE) {
          this.props.showAlert({
            message: 'user.login.loginFailure',
            type: 'danger',
            timeOut: 2000,
          });
        } else {
          this.props.showAlert({
            message: 'app.common.error',
            type: 'danger',
            timeOut: 2000,
          });
        }
      }).finally(() => {
        this.setState({ loggingIn: false });
      });
    }
  }

  render() {
    return (
      <div className={cx('container', style.loginWarper)}>
        <div className="row">
          <div className="col-sm-10 col-md-9 col-lg-7 mx-auto">
            <h5 className={cx(style.loginTitle, 'text-center')}><LabelLang id="user.login.title" /></h5>
            <div className={cx('card', style['login-card'])}>
              <div className="card-body">
                <LoginForm onSubmit={this.handleSubmit} className="form-signin">
                  <FieldLang
                    name="username"
                    containerClassName="form-group"
                    component={inputField}
                    validate={[isRequired(<LabelLang id="user.login.requiredUsername" />), isEmail(<LabelLang id="user.login.notValidUsername" />)]}
                    type="email"
                    className='form-control'
                    placeholder="user.login.username"
                  />
                  <FieldLang
                    containerClassName="form-group"
                    name="password"
                    className="form-control"
                    component={inputField}
                    validate={[isRequired(<LabelLang id="user.login.requiredPassword" />), isPassword(8)]}
                    type="password"
                    placeholder="user.login.password"
                  />
                  <div className={cx('form-control mb-3', style.customCheckbox)}>
                    <div className="row">
                      <div className={cx('col-12 col-md-7', style.rememberMe)}>
                        <FieldLang
                          name="keepSignin"
                          id="keepSignin"
                          component={checkBoxField}
                          type="checkbox"
                          className="form-check-input"
                        />
                        <label htmlFor="keepSignin"><LabelLang id="user.login.keepSignin" /></label>
                      </div>
                      <div className="col-5 col-md-5 text-right">
                        <button className={cx('btn btn-primary pull-right', style.buttonLogin, this.state.loggingIn ? 'disabled': '')} type="submit">Sign in</button>
                      </div>
                    </div>
                  </div>
                </LoginForm>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center">
            <Link to={URL.USER_FORGET_PASSWORD} className={cx('btn btn-link', style.link)}><LabelLang id="user.login.forgetPassword" /></Link>
            <Link to={URL.USER_SIGN_UP} className={cx('btn btn-link', style.link)}><LabelLang id="user.login.registerButton" /></Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  username: selectorForm(state, 'username'),
  password: selectorForm(state, 'password'),
  isAuthenticated: state.loginReducer.isAuthenticated
});

const mapDispatch = dispatch => ({
  loginBound: bindActionCreators(login, dispatch),
  showAlert: bindActionCreators(showAlert, dispatch),
});

const connectedLoginPage = connect(mapStateToProps, mapDispatch)(Login);
export default connectedLoginPage;
