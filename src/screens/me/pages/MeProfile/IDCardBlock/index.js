import React from 'react';
import { connect } from 'react-redux';
import { MyMessage } from 'src/lang/components';
import IDVerificationForm from './IDVerificationForm';

// eslint-disable-next-line
const IDCardBlock = ({ style, verified }) => (
  <div className={style.collapse_custom}>
    <div className={style.head}>
      <p className={style.label}>
        <MyMessage id="me.profile.verify.step3" />
        <br />
        <MyMessage id="me.profile.text.id_verification.desc1" />
      </p>
      <div className={style.extend}>
        <span className="badge badge-success">{verified ? 'Verified' : ''}</span>
      </div>
    </div>
    <div className={style.content}>
      <p className={style.text}><MyMessage id="me.profile.text.id_verification.desc12" /></p>
    </div>
    <IDVerificationForm onSubmit={values => console.log('values is', values)} />
  </div>
);

const mapState = state => ({
  verified: state.auth.profile?.verified || null,
});
export default connect(mapState)(IDCardBlock);
