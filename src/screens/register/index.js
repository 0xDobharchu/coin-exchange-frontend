import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MasterWallet } from 'src/services/Wallets/MasterWallet';
import { ReCaptcha } from 'react-recaptcha-google';
import { userActions } from './action';
import { history } from '../../utils/history';

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        confirmPassword: ''
      },
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ submitted: true });
    const { user } = this.state;
    if (user.firstName && user.lastName && user.username && user.password && user.confirmPassword) {
      userActions.register(user).then((loginUser) => {
        MasterWallet.createMasterWallets(user.password);
        console.log('create wallet success');
        console.log(MasterWallet);
        console.log(loginUser);
      }, (err) => {
        history.push('/');
        console.log(123, err);
      });
    }
  }

  render() {
    const recaptchaRef = React.createRef();
    const { registering } = this.props;
    const { user, submitted } = this.state;
    return (
      <div className="row justify-content-md-center">
        <div className="col-md-6">
          <h2>Register</h2>
          <form name="form" onSubmit={this.handleSubmit}>
            <div className={`form-group${submitted && !user.firstName ? ' has-error' : ''}`}>
              <label htmlFor="firstName">First Name
                <input type="text" className="form-control" name="firstName" value={user.firstName} onChange={this.handleChange} />
              </label>
              {submitted && !user.firstName
                && <div className="help-block">First Name is required</div>
              }
            </div>
            <div className={`form-group${submitted && !user.lastName ? ' has-error' : ''}`}>
              <label htmlFor="lastName">Last Name
                <input type="text" className="form-control" name="lastName" value={user.lastName} onChange={this.handleChange} />
              </label>
              {submitted && !user.lastName
                && <div className="help-block">Last Name is required</div>
              }
            </div>
            <div className={`form-group${submitted && !user.username ? ' has-error' : ''}`}>
              <label htmlFor="username"> Username
                <input type="text" className="form-control" name="username" value={user.username} onChange={this.handleChange} />
              </label>

              {submitted && !user.username
                && <div className="help-block">Username is required</div>
              }
            </div>
            <div className={`form-group${submitted && !user.password ? ' has-error' : ''}`}>
              <label htmlFor="password">Password
                <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
              </label>
              {submitted && !user.password
                && <div className="help-block">Password is required</div>
              }
            </div>
            <div className={`form-group${submitted && !user.confirmPassword ? ' has-error' : ''}`}>
              <label htmlFor="password">Confirm Password
                <input type="password" className="form-control" name="confirmPassword" value={user.confirmPassword} onChange={this.handleChange} />
              </label>
              {submitted && !user.confirmPassword
                && <div className="help-block">Confirm password is required</div>
              }
              {submitted && (user.confirmPassword !== user.password)
                && <div className="help-block">Passwords do not match.</div>
              }
            </div>
            <div className="form-group">
              <ReCaptcha
                ref={recaptchaRef}
                sitekey="6LcBY3oUAAAAAJ6g25Hen60o3Q7DOHc0VYC97DRa"
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">Register</button>
              {registering
                && <img alt="is register" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
              }
              <Link to="/login" className="btn btn-link">Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { registering } = state.registration || {};
  return {
    registering
  };
}

const mapDispatch = dispatch => ({
  registerBound: bindActionCreators(userActions.register, dispatch),
});

const connectedRegisterPage = connect(mapStateToProps, mapDispatch)(RegisterPage);
export default connectedRegisterPage;
