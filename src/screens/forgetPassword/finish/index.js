import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import createForm from 'src/components/core/form/createForm';
import { formValueSelector } from 'redux-form';
import inputField from 'src/components/core/form/fields/input';
import LabelLang from 'src/lang/components/LabelLang';
import { FieldLang } from 'src/lang/components';
import {isPassword, isConfirmPassword, isRequired} from 'src/components/core/form/validator';
import cx from 'classnames';
import queryString from 'query-string';
import {Link} from 'react-router-dom';
import {URL} from 'src/resources/constants/url';
import resetPassActions  from '../action';
import style from '../style.scss';

const ForgetPassFinishForm = createForm({
  propsReduxForm: {
    form: 'ForgetPassFinishForm',
    initialValues: {
    },
  },
});

const selectorForm = formValueSelector('ForgetPassFinishForm');

class ForgetPassFinish extends React.Component {
  constructor(props) {
    super(props);
    const params = queryString.parse(this.props.location.search);
    this.state = {
      isSubmiting: false,
      email: params.email,
      token: params.token
    };
  }

  submitResetPassFinish=() => {
    this.setState({ isSubmiting: true });
    const { password, confirmPassword } = this.props;
    const { email, token } = this.state;
    if (token && password && confirmPassword) {
      const message = `Password of Coinbowl account for ${email} has been changed`;
      this.props.resetPassFinish(token, password).then(() => {
        alert(message);
        this.props.history.push(URL.USER_SIGN_IN);
      }, (err) => {
        alert('OH! something went wrong!');
        console.log('submitAddContact', err);
      }).finally(() => {
        this.setState({ isSubmiting: false });
      });
    }
  };

  render() {
    const { isSubmiting, email } = this.state;
    return (
      <div className={cx('container', style.forgetPasswordWarper)}>
        <div className="row">
          <div className="col-sm-10 col-md-9 col-lg-7 mx-auto">
            <h1 className={cx(style.forgetPasswordTitle, 'text-center')}>
              <LabelLang id="user.forgetPassword.title" />
            </h1>
            <div className={style.description}><LabelLang id="user.forgetPassword.newPasswordTitle" values={{email}} /></div>
            <div className={cx('card', style.forgetPasswordCard)}>
              <div className="card-body">
                <ForgetPassFinishForm onSubmit={this.submitResetPassFinish}>
                  <FieldLang
                    containerClassName="form-group"
                    name="password"
                    className="form-control"
                    component={inputField}
                    validate={[isRequired(<LabelLang id="user.forgetPassword.requiredPassword" />), isPassword(<LabelLang id="user.forgetPassword.notValidPassword" />)]}
                    type="password"
                    placeholder="user.forgetPassword.password"
                  />
                  <FieldLang
                    containerClassName="form-group"
                    name="confirmPassword"
                    className="form-control"
                    component={inputField}
                    validate={[(value, values) => isConfirmPassword(values.password, <LabelLang id="user.forgetPassword.notValidConfirmPassword" />)(value)]}
                    type="password"
                    placeholder="user.forgetPassword.confirmPassword"
                  />
                  <div className="form-group">
                    <button type="submit" className={cx('btn btn-primary btn-block', style.buttonforgetPassword, isSubmiting ? ' disabled': '' )}><LabelLang id="user.forgetPassword.submitButton" /></button>
                  </div>
                </ForgetPassFinishForm>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center">
            <Link to={URL.USER_FORGET_PASSWORD} className={cx('btn btn-link', style.link)}><LabelLang id="user.forgetPassword.notRecoverPass" /></Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  password: selectorForm(state, 'password'),
  confirmPassword: selectorForm(state, 'confirmPassword')
});

const mapDispatch = dispatch => ({
  resetPassFinish: bindActionCreators(resetPassActions.resetPassFinish, dispatch),
});

const connectedContactPage = connect(mapStateToProps, mapDispatch)(ForgetPassFinish);
export default connectedContactPage;
