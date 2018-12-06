import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LabelLang from 'src/lang/components/LabelLang';
import { USER_LEVEL, VERIFICATION_STATUS } from 'src/resources/constants/userVerification';
import { URL } from 'src/resources/constants/url';
import { injectIntl } from 'react-intl';
import currentUser from 'src/utils/authentication';
import styles from './styles.scss';

class UserVerifyStatus extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { userLevel, verificationStatus } = this.props;
    if (currentUser.isLogin() && userLevel === USER_LEVEL.LEVEL_1 && verificationStatus === VERIFICATION_STATUS.PENDING) {
      return (
        <Card className={styles.card} bg="warning">
          <Card.Body>
            <span>
              <LabelLang
                id="components.userVerifyStatus.level1Pending"
                values={{
                  verify: <Link to={URL.ME_ACCOUNT_LEVEL}><span className={styles.btn}><LabelLang id="components.userVerifyStatus.verifyBtn" /></span></Link>,
                }}
              />
            </span>
          </Card.Body>
        </Card>
      );
    } else if(!currentUser.isLogin()) {
      return (
        <Card className={styles.card} bg="warning">
          <Card.Body>
            <span>
              <LabelLang
                id="components.userVerifyStatus.notLogin"
                values={{
                  action: <Link to={URL.USER_SIGN_IN}><span className={styles.btn}><LabelLang id="components.userVerifyStatus.notLoginBtn" /></span></Link>,
                }}
              />
            </span>
          </Card.Body>
        </Card>
      );
    }
    return null;
  }
}

const mapState = state => ({
  userLevel: state?.auth?.profile?.verification_level || USER_LEVEL.LEVEL_1,
  verificationStatus: state?.auth?.profile?.verification_status || VERIFICATION_STATUS.PENDING,
});

export default injectIntl(connect(mapState, null)(UserVerifyStatus));
