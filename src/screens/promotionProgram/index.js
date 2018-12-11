import React from 'react';
import {connect} from 'react-redux';
import LabelLang from 'src/lang/components/LabelLang';
import earlyBirdIcon from 'src/assets/images/promotionPrograms/early_bird_program.svg';
import referralIcon from 'src/assets/images/promotionPrograms/referral_program.svg';
import referrerIcon from 'src/assets/images/promotionPrograms/referrer_icon.svg';
import userIcon from 'src/assets/images/promotionPrograms/user_icon.svg';
import ProgramItem from 'src/screens/promotionProgram/programItem';
import styles from './styles.scss';

const programs = [
  {
    logo: earlyBirdIcon,
    title: <LabelLang id='promotion_programs.early_bird_program.title' />,
    description: <LabelLang id='promotion_programs.early_bird_program.description' />,
    key: 'earlyBird'
  },
  {
    logo: referralIcon,
    title: <LabelLang id='promotion_programs.referral_program.title' />,
    description: <LabelLang id='promotion_programs.referral_program.description' />,
    key: 'referral'
  },
];

const numEarlyBirdTermAndCondition = 4;
let earlyBirdTermAndCondition = [];
for (let i = 0; i < numEarlyBirdTermAndCondition; i++) {
  earlyBirdTermAndCondition.push(<LabelLang id={`promotion_programs.early_bird_program.termAndConditions.${i}`} />);
}

const numRefferTermAndCondition = 3;
const referrerReferralTermAndCondition = [];

for (let i = 0; i < numRefferTermAndCondition; i++) {
  referrerReferralTermAndCondition.push(<LabelLang id={`promotion_programs.referral_program.referrer.termAndConditions.${i}`} />);
}

const numRefferDescription = 2;
const referrerDescription = [];
for (let i = 0; i < numRefferDescription; i++) {
  referrerDescription.push(<LabelLang id={`promotion_programs.referral_program.referrer.descriptions.${i}`} />);
}

const numUserTermAndCondition = 2;
const userReferralTermAndCondition = [];

for (let i = 0; i < numUserTermAndCondition; i++) {
  userReferralTermAndCondition.push(<LabelLang id={`promotion_programs.referral_program.user.termAndConditions.${i}`} />);
}

class PromotionProgram extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      programType: 'earlyBird',
    };
  }

  componentDidMount() {
  }

  choosePromotionProgram = (programType) => {
    console.log('choosePromotionProgram', programType);
    this.setState({ programType });
  }

  render() {
    const { programType } = this.state;
    console.log('userTermAndCondition',earlyBirdTermAndCondition);
    let index = 0;
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <LabelLang id="static_page.promotionPrograms" />
        </div>
        <div className={styles.bannerContainer}>
          {programs.map((item) => {
            const { logo, title, description, key } = item;
            index++;
            return (
              <ProgramItem logo={logo} title={title} description={description} key={key} programType={key} choosePromotionProgram={this.choosePromotionProgram} index={index} />
            );
          })}
        </div>
        <div className={styles.content}>
          {programType === 'earlyBird' ?
            (
              <div>
                <div className={styles.termAndCondition}>
                  <LabelLang id="promotion_programs.termAndConditions" />
                  <hr />
                </div>
                {
                  earlyBirdTermAndCondition.map(item => {
                    index++;
                    return <p className={styles.text} key={index}>{item}</p>;
                  })
                }
              </div>
            ):
            (
              <div>
                <div>
                  <div className={styles.userHeader}>
                    <div className={styles.userTitle}>
                      <img src={referrerIcon} alt="" />
                      <div className={styles.userTitleName}><LabelLang id="promotion_programs.referral_program.referrer.title" /></div>
                    </div>
                    <LabelLang id="promotion_programs.referral_program.referrer.description" className={styles.userTitleContent} />
                  </div>
                  <div className={styles.termAndCondition}>
                    <LabelLang id="promotion_programs.termAndConditions" />
                    <hr />
                  </div>
                  {
                  referrerReferralTermAndCondition.map(item => {
                    index++;
                    return <p className={styles.text} key={index}>{item}</p>;
                  })
                }
                </div>
                <div>
                  <div className={styles.userHeader}>
                    <div className={styles.userTitle}>
                      <img src={userIcon} alt="" />
                      <div className={styles.userTitleName}><LabelLang id="promotion_programs.referral_program.user.title" /></div>
                    </div>
                    <LabelLang id="promotion_programs.referral_program.user.description" className={styles.userTitleContent} />
                  </div>
                  {
                    referrerDescription.map(item => {
                      index++;
                      return <p className={styles.text} key={index}>{item}</p>;
                    })
                  }
                  <div className={styles.termAndCondition}>
                    <LabelLang id="promotion_programs.termAndConditions" />
                    <hr />
                  </div>
                  {
                    userReferralTermAndCondition.map(item => {
                      index++;
                      return <p className={styles.text} key={index}>{item}</p>;
                    })
                  }
                </div>
              </div>
            )}
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
