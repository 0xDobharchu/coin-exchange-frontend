import React from 'react';
import {connect} from 'react-redux';
import {Button} from 'src/components/custom';
import {showAlert} from 'src/screens/app/redux/action';
import {LabelLang, WrapperLang} from 'src/lang/components';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import style from './style.scss';
import SocialBox from '../socialBox';

// eslint-disable-next-line
const ReferralBox = ({ name, showAlert }) => {
  const getReferralLink = () => window.location.origin + '/referral/' + name;
  const handleFocus = event => { event.target.select(); };
  const showMessage = (message, type) => showAlert({ message, type });
  const showSuccess = id => showMessage(id, 'success');
  return (
    <div style={{ marginTop: '10px' }}>
      <div><LabelLang id="me.accountInfo.referralLink" />
        {/* <input value={getReferralLink()} /> */}
        <div className="input-group" style={{marginTop: '10px'}}>
          <input onFocus={handleFocus} type="text" className={'form-control ' + style.inputReferalLink} value={getReferralLink()} readOnly aria-label="referral link" aria-describedby="referral-link" />
          <div className="input-group-append" style={{marginLeft: '10px'}}>
            <CopyToClipboard text={getReferralLink()} onCopy={()=>showSuccess('wallet.refers.success.copy_link')}>
              <Button value="Copy" />
            </CopyToClipboard>
          </div>

        </div>

      </div>
      <WrapperLang>
        {ts =>
          <SocialBox socialLink={getReferralLink()} socialText={ts('app.description')} />
        }
      </WrapperLang>

    </div>
  );
};

const mapState = state => ({
  name: state.auth.profile.name
});

export default connect(mapState, { showAlert })(ReferralBox);
