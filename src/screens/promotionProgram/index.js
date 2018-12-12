import React from 'react';
import {connect} from 'react-redux';
import LabelLang from 'src/lang/components/LabelLang';
import referralIcon from 'src/assets/images/promotionPrograms/referral_program.svg';
import ProgramItem from 'src/screens/promotionProgram/programItem';
import styles from './styles.scss';

const programs = [
  // {
  //   logo: earlyBirdIcon,
  //   title: <LabelLang id='promotion_programs.early_bird_program.title' />,
  //   description: <LabelLang id='promotion_programs.early_bird_program.description' />,
  //   key: 'earlyBird'
  // },
  {
    logo: referralIcon,
    title: <LabelLang id='promotion_programs.referral_program.title' />,
    description: <LabelLang id='promotion_programs.referral_program.description' />,
    key: 'referral'
  },
];

const numBenefits = 2;
const benefits = [];

for (let i = 0; i < numBenefits; i++) {
  benefits.push(<LabelLang id={`promotion_programs.referral_program.benefits.content.${i}`} />);
}

const numHowToDo = 1;
const howToDo = [];

for (let i = 0; i < numHowToDo; i++) {
  howToDo.push(<LabelLang id={`promotion_programs.referral_program.howToDo.content.${i}`} />);
}

const referralContent = [
  {
    title: <LabelLang id="promotion_programs.referral_program.benefits.title" />,
    content: benefits
  },
  {
    title: <LabelLang id="promotion_programs.referral_program.howToDo.title" />,
    content: howToDo
  }
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
        <div className={styles.header}>
          <LabelLang id="static_page.promotionPrograms" />
        </div>
        <div className={styles.bannerContainer}>
          {programs.map((item) => {
            const { logo, title, description, key } = item;
            index++;
            return (
              <ProgramItem logo={logo} title={title} description={description} key={key} programType={key} index={index} />
            );
          })}
        </div>
        <div className={styles.content}>
          {
            referralContent.map(item => {
              index++;
              const {title, content} = item;
              index++;
              return (
                <div key={index}>
                  <div className={styles.termAndCondition}>
                    {title}
                    <hr />
                  </div>
                  <ul>
                    {
                      content.map(ct => {
                        index++;
                        return (<li key={index}>{ct}</li>);
                      })
                    }
                  </ul>
                </div>
              );
            })
          }
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
