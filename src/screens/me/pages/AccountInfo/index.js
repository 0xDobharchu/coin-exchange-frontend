import React from 'react';
import { connect } from 'react-redux';
import { LabelLang } from 'src/lang/components';
import { showAlert } from 'src/screens/app/redux/action';
import { changePassword } from 'src/screens/auth/redux/api';
import { updateProfileAction } from 'src/screens/auth/redux/action';
import { Row, Col } from 'react-bootstrap';
import {injectIntl} from 'react-intl';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button } from 'src/components/custom';
import ChangePassword from './ChangePassword';
import EmailBlock from './EmailBlock';
import ChangeNameForm from './Form/ChangeNameForm';
import PersonalDetailForm from './Form/PersonalDetailForm';
import Referral from './Referral';
import style from './style.scss';
import SocialBox from './socialBox';

// eslint-disable-next-line
const AccountInfo = ({ name, updateProfileAction, showAlert, intl }) => {
  const getReferralLink = () => window.location.origin + '/sign-up?referral=' + name;
  const showMessage = (message, type) => showAlert({ message, type });
  const showSuccess = id => showMessage(id, 'success');
  const showError = id => showMessage(id, 'danger');
  const handleChangePassword = values => changePassword(values).then(() => showSuccess('me.accountInfo.alert.passwordSuccess')).catch(() => showError('me.accountInfo.alert.passwordFailed'));
  const handleUpdateNickname = values => updateProfileAction(values).then(() => showSuccess('me.accountInfo.alert.success'));
  
  const handleFocus = event => { event.target.select(); };
  
  return (
    <div className={style.container}>
      <label className={style.title}><LabelLang id="me.accountInfo.userProfile" /></label>
      <div className={style.lineTitle} />
      <div className={style.block1}>
        <ChangePassword onSubmit={handleChangePassword} />
      </div>
      <div className={style.lineTitle} />
      <div className={style.block1}>
        <EmailBlock />
        <ChangeNameForm onSubmit={handleUpdateNickname} />
      </div>
      <label className={style.title}><LabelLang id="me.accountInfo.personalDetails" /></label>
      <div className={style.lineTitle} />
      <Row className={style.personalDetail}>
        <Col md={4} className={style.leftSide}>
          <label className={style.fontLeft}><LabelLang id="me.accountInfo.personalDetailsDesc" /></label>
        </Col>
        <Col md={8}>
          <PersonalDetailForm onSubmit={handleUpdateNickname} />
        </Col>
      </Row>
      <label className={style.title}><LabelLang id="me.accountInfo.referralTitle" /></label>
      <div className={style.lineTitle} />

      <div style={{ marginTop: '10px' }}>
        <div><MyMessage id="me.accountInfo.referralLink" /> 
          {/* <input value={getReferralLink()} /> */}
          <div className="input-group" style={{marginTop: '10px'}}>
            <input onFocus={handleFocus} type="text" className={'form-control ' + style.inputReferalLink} value={getReferralLink()} readOnly aria-label="referral link" aria-describedby="referral-link" />
            <div className="input-group-append">              
              <CopyToClipboard text={getReferralLink()} onCopy={()=>showSuccess('wallet.refers.success.copy_link')}>
                <Button value="Copy" />
              </CopyToClipboard>
            </div>
            
          </div> 

        </div>
        
        <SocialBox socialLink={getReferralLink()} socialText={intl['messages']['app.description']} />

        {/* <a href="https://www.facebook.com/sharer/sharer.php?s=100&p[url]=http://staging.coinbowl.com&p[images][0]=&p[title]=Title%20Goes%20Here&p[summary]=Description%20goes%20here!" target="_blank" rel="noopener noreferrer" onClick="window.open(this.href,'targetWindow','toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=250'); return false">
          <button style={{ width:'30px', height: '30px' }} type="button" className="btn btn-facebook btn-lg">
            <i className="fa fa-facebook fa-2" />F
          </button>
        </a> */}

      </div>
      <Referral />
    </div>
  );
};

const mapState = state => ({
  name: state.auth.profile.name
});

const mapDispatch = { updateProfileAction, showAlert };
export default injectIntl(connect(mapState, mapDispatch)(AccountInfo));
