import React from 'react';
import { connect } from 'react-redux';
import { showAlert } from 'src/screens/app/redux/action';
import { MyMessage } from 'src/lang/components';
import valid from 'src/services/validate';
import EmailForm from './EmailForm';

// eslint-disable-next-line
const EmailBlock = ({ style, showAlert, email }) => {
  const handleVerifyEmail = (values) => {
    console.log('veerify email', values);
    const { email: emailForm } = values;
    if (emailForm) {
      if (valid.email(email)) {
        showAlert({
          message: <MyMessage id="me.profile.verify.alert.notValid.client.email" />,
          timeOut: 3000,
          type: 'danger'
        });
      }
    }
  };

  return (
    <div className={style.collapse_custom}>
      <div className={style.head}>
        <p className={style.label}>
          <MyMessage id="me.profile.text.email.label" />
        </p>
        <div className={style.extend}>
          <span className="badge badge-success">{email ? 'Verified' : ''}</span>
        </div>
      </div>
      <div className={style.content}>
        <p className={style.text}><MyMessage id="me.profile.text.email.desc2" /></p>
      </div>
      <EmailForm onSubmit={handleVerifyEmail} />
    </div>
  );
};

const mapState = state => ({
  email: state.auth.profile?.email || null,
});
const mapDispatch = { showAlert };
export default connect(mapState, mapDispatch)(EmailBlock);
