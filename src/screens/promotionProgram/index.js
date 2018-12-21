import React from 'react';
import {connect} from 'react-redux';
import referralIcon from 'src/assets/images/promotionPrograms/referral_program.svg';
import earlyBirdIcon from 'src/assets/images/promotionPrograms/early_bird_program.svg';
import ProgramItem from 'src/screens/promotionProgram/programItem';
import {LabelLang, HtmlLang} from 'src/lang/components';
import cx from 'classnames';
import {Link} from 'react-router-dom';
import {URL} from 'src/resources/constants/url';
import ReferralBox from 'src/screens/me/pages/Referral/referralBox';
import currentUser from 'src/utils/authentication';
import styles from './styles.scss';

const programs = [
  {
    logo: referralIcon,
    title: <LabelLang id='promotion_programs.referral_program.title' />,
    description: <HtmlLang id='promotion_programs.referral_program.description' />,
    key: 'referral'
  },
  {
    logo: earlyBirdIcon,
    title: <LabelLang id='promotion_programs.commission.title' />,
    description: <HtmlLang id='promotion_programs.commission.description' />,
    key: 'commission'
  },
];

class PromotionProgram extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    let index = 0;
    return (
      <div className={styles.container}>
        <div className="container">
          <div className={styles.header}>
            <LabelLang id="static_page.promotionPrograms" />
          </div>
          <div className={styles.bannerContainer}>
            {programs.map((item) => {
              const {logo, title, description, key} = item;
              index++;
              return (
                <ProgramItem
                  logo={logo}
                  title={title}
                  description={description}
                  key={key}
                  programType={key}
                  index={index}
                />
              );
            })}
          </div>
        </div>
        <div className={styles.content}>
          <div className="container">
            {currentUser.isLogin() ? (
              <div className={styles.referralBox}>
                <ReferralBox />
              </div>
            ) : (
              <div className={styles.login}>
                <label className={styles.title}><LabelLang id="promotion_programs.textRequireLogin" /></label>
                <Link to={URL.USER_SIGN_IN}>
                  <button type="button" className={cx(styles.active, styles.button)}><LabelLang
                    id="promotion_programs.signInNow"
                  />
                  </button>
                </Link>
              </div>
            )
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapState = () => ({
});

const mapDispatch = () => ({
});

export default connect(mapState, mapDispatch)(PromotionProgram);
