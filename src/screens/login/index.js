import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import createForm from 'src/components/core/form/createForm';
import { formValueSelector } from 'redux-form';
import { FieldLang } from 'src/lang/components';
import inputField from 'src/components/core/form/fields/input';
import checkBoxField from 'src/components/core/form/fields/checkbox';
import { isEmail, isPassword, isRequired } from 'src/components/core/form/validator';
import { USER } from 'src/resources/constants/user';
import LabelLang from 'src/lang/components/LabelLang';
import cx from 'classnames';
import { login } from './action';
import style from './style.scss';

const LoginForm = createForm({
  propsReduxForm: {
    form: 'LoginForm',
    initialValues: {
      input: '',
    },
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
  }

  handleSubmit() {
    this.setState({ loggingIn: true });
    const { username, password } = this.props;
    if (username && password) {
      this.props.loginBound(username, password).then((res) => {
        if (res === USER.LOGIN_SUCCESS) {
          console.log('Login successfull');
          const redirectTo = this.props.location.state.from? this.props.location.state.from.pathname : '/';
          this.props.history.push(redirectTo);
        }
      }).finally(() => {
        this.setState({ loggingIn: false });
      });
    }
  }

  render() {
    return (
      <div className={cx('container', style['login-warper'])}>
        <div className="row">
          <div className="col-sm-10 col-md-8 col-lg-6 mx-auto">
            <h5 className={cx(style.loginTitle, 'text-center')}><LabelLang id="user.login.title" /></h5>
            <div className={cx('card', style['login-card'])}>
              <div className="card-body">
                <LoginForm onSubmit={this.handleSubmit} className="form-signin">
                  <FieldLang
                    name="username"
                    containerClassName="form-group"
                    component={inputField}
                    validate={[isRequired(<LabelLang id="user.login.requiredUsername" />), isEmail(<LabelLang id="user.login.notValidUsername" />)]}
                    type="text"
                    className='form-control'
                  />
                  <FieldLang
                    containerClassName="form-group"
                    name="password"
                    className="form-control"
                    component={inputField}
                    validate={[isRequired(<LabelLang id="user.login.requiredPassword" />), isPassword(8)]}
                    type="password"
                  />
                  <div className={cx('form-control mb-3', style.customCheckbox)}>
                    <div className="row">
                      <div className={cx('col-7', style['remember-me'])}>
                        <FieldLang
                          name="keepSignin"
                          id="keepSignin"
                          component={checkBoxField}
                          type="checkbox"
                          className="form-check-input"
                        />
                        <label htmlFor="keepSignin"><LabelLang id="user.login.keepSignin" /></label>
                      </div>
                      <div className="col-5 text-right">
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
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <Link to="/forget-password" className={cx('btn btn-link', style.link)}><LabelLang id="user.login.forgetPassword" /></Link>
            <Link to="/sign-up" className={cx('btn btn-link', style.link)}><LabelLang id="user.login.registerButton" /></Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  username: selectorForm(state, 'username'),
  password: selectorForm(state, 'password')
});

const mapDispatch = dispatch => ({
  loginBound: bindActionCreators(login, dispatch),
});

const connectedLoginPage = connect(mapStateToProps, mapDispatch)(Login);
export default connectedLoginPage;
