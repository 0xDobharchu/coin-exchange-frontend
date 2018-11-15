import React from 'react';
import { connect } from 'react-redux';
import { showAlert } from 'src/screens/app/redux/action';
import { MyMessage } from 'src/lang/components';
import valid from 'src/services/validate';
import PhoneForm from './PhoneForm';

// eslint-disable-next-line
const PhoneBlock = ({ style, showAlert, phone }) => {
  const handleVerifyEmail = (values) => {
    console.log('veerify phone', values);
    const { phone: emailForm } = values;
    if (emailForm) {
      if (valid.email(emailForm)) {
        console.log('email is invalid');
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
          <MyMessage id="me.profile.verify.step2" />
        </p>
        <div className={style.extend}>
          <span className="badge badge-success">{phone ? 'Verified' : ''}</span>
        </div>
      </div>
      <div className={style.content}>
        <p className={style.text}><MyMessage id="me.profile.text.id_verification.desc13" /></p>
      </div>
      <PhoneForm onSubmit={handleVerifyEmail} />
    </div>
  );
};

const mapState = state => ({
  phone: state.auth.profile?.phone || null,
});
const mapDispatch = { showAlert };
export default connect(mapState, mapDispatch)(PhoneBlock);
