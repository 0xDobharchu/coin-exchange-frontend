import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import createForm from 'src/components/core/form/createForm';
import { formValueSelector } from 'redux-form';
import inputField from 'src/components/core/form/fields/input';
import LabelLang from 'src/lang/components/LabelLang';
import { FieldLang } from 'src/lang/components';
import { isEmail, isRequired } from 'src/components/core/form/validator';
import cx from 'classnames';
import { showAlert } from 'src/screens/app/redux/action';
import resetPassActions  from './action';
import style from './style.scss';

const ForgetPassForm = createForm({
  propsReduxForm: {
    form: 'ForgetPassForm',
    initialValues: {
      input: '',
    },
  },
});

const selectorForm = formValueSelector('ForgetPassForm');

class Contact extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSubmiting: false,
    };
  }

  submitResetPass=(e) => {
    (e && e.preventDefault) && e.preventDefault();
    this.setState({ isSubmiting: true });
    const { email } = this.props;

    if (email) {
      this.props.resetPass(email).then(() => {
        this.setState({ isSubmiting: false });
        this.props.showAlert({
          message: 'user.forgetPassword.resetPasswordIntro',
          timeOut: 5000,
        });
      }, (err) => {
        this.props.showAlert({
          message: 'app.common.error',
          type: 'danger',
          timeOut: 1000,
        });
        this.setState({ isSubmiting: false });
        console.log('submitResetPass', err);
      });
    }
    return false;
  };

  render() {
    const { isSubmiting } = this.state;
    const requiredUsername = isRequired('user.forgetPassword.requiredUsername');
    const checkUsername = isEmail('user.forgetPassword.notValidUsername');
    return (
      <div className={cx('container', style.forgetPasswordWarper)}>
        <div className="row">
          <div className="col-sm-10 col-md-9 col-lg-7 mx-auto">
            <h1 className={cx(style.forgetPasswordTitle, 'text-center')}>
              <LabelLang id="user.forgetPassword.title" />
            </h1>
            <div className={style.description}><LabelLang id="user.forgetPassword.description" /></div>
            <div className={cx('card', style.forgetPasswordCard)}>
              <div className="card-body">
                <ForgetPassForm onSubmit={this.submitResetPass} method="post">
                  <div className="form-group">
                    <FieldLang
                      name="email"
                      className="form-control"
                      component={inputField}
                      validate={[requiredUsername, checkUsername]}
                      type="email"
                      placeholder="user.forgetPassword.username"
                    />
                  </div>
                  <div className="form-group">
                    <button type="submit" className={cx('btn btn-primary btn-block', style.buttonForgetPassword, isSubmiting ? ' disabled': '' )}>
                      <LabelLang id="user.forgetPassword.submitButton" />
                    </button>
                  </div>
                </ForgetPassForm>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  email: selectorForm(state, 'email')
});

const mapDispatch = dispatch => ({
  resetPass: bindActionCreators(resetPassActions.resetPass, dispatch),
  showAlert: bindActionCreators(showAlert, dispatch),
});

const connectedContactPage = connect(mapStateToProps, mapDispatch)(Contact);
export default connectedContactPage;
