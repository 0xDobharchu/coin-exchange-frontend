import React from 'react';
import {connect} from 'react-redux';
import {LabelLang} from 'src/lang/components';
import style from './style.scss';
import ReferralList from './ReferralList';
import ReferralEarningList from './ReferralEarningList';
import ReferralEarningReferral from './ReferralEarningReferral';
import ReferralBox from './referralBox';

// eslint-disable-next-line
const Referral = ({ }) => {
  return (
    <div className={style.container}>
      <label className={style.title}><LabelLang id="me.accountInfo.referralTitle" /></label>
      <div className={style.lineTitle} />

      <ReferralBox />
      <ReferralList />

      <label className={style.title}><LabelLang id="me.accountInfo.referralEarningTitle" /></label>
      <div className={style.lineTitle} />
      <ReferralEarningList />
      <ReferralEarningReferral />
    </div>
  );
};

const mapState = () => ({
});

export default connect(mapState, {  })(Referral);
