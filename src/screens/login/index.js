import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { history } from 'src/utils/history';
import createForm from 'src/components/core/form/createForm';
import { Field, formValueSelector } from 'redux-form';
import { userActions } from './action';
import inputField, { inputValidator } from '../../components/core/form/fields/input';

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
    // e.preventDefault();
    this.setState({ loggingIn: true });
    const { username, password } = this.props;
    if (username && password) {
      console.log(username, password);
      this.props.loginBound(username, password).then((user) => {
        console.log(user);
        this.setState({ loggingIn: false });
        // history.push('/');
      }, (err) => {
        // history.push('/');
        this.setState({ loggingIn: false });
        console.log(123, err);
      });
    }
  }

  render() {
    const { loggingIn } = this.state;
    return (
      <div className="row justify-content-md-center">
        <div className="col-md-6">
          <h2>Login</h2>
          <LoginForm onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Field
                name="username"
                className="form-control"
                component={inputField}
                validate={inputValidator}
                type="text"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field
                name="password"
                className="form-control"
                component={inputField}
                validate={inputValidator}
                type="password"
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">Login</button>
              {loggingIn
                        && <img alt="is login" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
              <Link to="/register" className="btn btn-link">Register</Link>
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
  loginBound: bindActionCreators(userActions.login, dispatch),
});

const connectedLoginPage = connect(mapStateToProps, mapDispatch)(Login);
export default connectedLoginPage;
