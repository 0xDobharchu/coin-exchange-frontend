import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { MasterWallet } from 'src/services/Wallets/MasterWallet';
import ReCAPTCHA from 'react-google-recaptcha';
// import { history } from 'src/utils/history';
import createForm from 'src/components/core/form/createForm';
import { Field, formValueSelector } from 'redux-form';
import { userActions } from './action';
import inputField, { inputValidator } from '../../components/core/form/fields/input';

const TEST_SITE_KEY = '6LeEa3oUAAAAANL9v6vxyzG9_x4u2ZBlQD8YnLzg';

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
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ registering: true });
    const {
      firstName, lastName, username, password, confirmPassword
    } = this.props;
    if (firstName && lastName && username && password && confirmPassword) {
      userActions.register({
        firstName,
        lastName,
        username,
        password,
        confirmPassword
      }).then((loginUser) => {
        // /MasterWallet.createMasterWallets(user.password);
        this.setState({ registering: false });
        console.log('create wallet success');
        // console.log(MasterWallet);
        console.log(loginUser);
      }, (err) => {
        this.setState({ registering: false });
        history.push('/');
        console.log(123, err);
      });
    }
  }

  render() {
    const { registering } = this.state;
    return (
      <div className="row justify-content-md-center">
        <div className="col-md-6">
          <h2>Register</h2>
          <RegisterForm onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <Field
                name="firstName"
                className="form-control"
                component={inputField}
                validate={inputValidator}
                type="text"
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <Field
                name="lastName"
                className="form-control"
                component={inputField}
                validate={inputValidator}
                type="text"
              />
            </div>
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
              <label htmlFor="confirmPassword">Confirm password</label>
              <Field
                name="confirmPassword"
                className="form-control"
                component={inputField}
                validate={inputValidator}
                type="password"
              />
            </div>
            <div className="form-group">
              <ReCAPTCHA
                style={{ display: 'inline-block' }}
                ref={this._reCaptchaRef}
                sitekey={TEST_SITE_KEY}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">Register</button>
              {registering
                        && <img alt="is register" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
              <Link to="/login" className="btn btn-link">Cancel</Link>
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
  confirmPassword: selectorForm(state, 'confirmPassword')
});
const mapDispatch = dispatch => ({
  registerBound: bindActionCreators(userActions.register, dispatch),
});

const connectedRegisterPage = connect(mapStateToProps, mapDispatch)(RegisterPage);
export default connectedRegisterPage;
