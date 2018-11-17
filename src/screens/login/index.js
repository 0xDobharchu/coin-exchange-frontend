import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import createForm from 'src/components/core/form/createForm';
import { formValueSelector } from 'redux-form';
import { FieldLang } from 'src/lang/components';
import inputField from 'src/components/core/form/fields/input';
import { isEmail, isPassword, isRequired } from 'src/components/core/form/validator';
import { USER } from 'src/resources/constants/user';
import LabelLang from 'src/lang/components/LabelLang';
import { login } from './action';

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
    const { loggingIn } = this.state;
    return (
      <div className="row justify-content-md-center">
        <div className="col-md-6">
          <h2><LabelLang id="user.login.title" /></h2>
          <LoginForm onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="username"><LabelLang id="user.login.username" /></label>
              <FieldLang
                name="username"
                className="form-control"
                component={inputField}
                validate={[isRequired(<LabelLang id="user.login.requiredUsername" />), isEmail(<LabelLang id="user.login.notValidUsername" />)]}
                type="text"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password"><LabelLang id="user.login.password" /></label>
              <FieldLang
                name="password"
                className="form-control"
                component={inputField}
                validate={[isRequired(<LabelLang id="user.login.requiredPassword" />), isPassword(8)]}
                type="password"
              />
            </div>
            <div className="form-group">
              <FieldLang
                name="keepSignin"
                id="keepSignin"
                component={inputField}
                type="checkbox"
              />
              <label htmlFor="keepSignin"><LabelLang id="user.login.keepSignin" /></label>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary"><LabelLang id="user.login.loginButton" /></button>
              {loggingIn
                        && <img alt="is login" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
              <Link to="/register" className="btn btn-link"><LabelLang id="user.login.registerButton" /></Link>
              <Link to="/forget-password" className="btn btn-link"><LabelLang id="user.login.forgetPassword" /></Link>
            </div>
          </LoginForm>
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
