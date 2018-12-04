import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FAIL_DEFAULT_LANGUAGE } from 'src/resources/constants/languages';
import { getAboutContent } from 'src/screens/landingpage/redux/action';
import LabelLang from 'src/lang/components/LabelLang';
import styles from './styles.scss';
// import cx from 'classnames';
// const aboutHTML = '<h2>Contact us</h2><br />Shanzhai Limited is a technology company founded in 2015 based in Hong Kong. Working in e-commerce field, we aimed at providing customers satisfying experience in purchasing online. To follow growing trend towards crypto, Shanzhai has made a leap into crypto area by launching a new crypto online exchange named CoinBowl.<br /><br />Coinbowl.com is a new crypto exchange specifically designed for people living in Asia, who have had limited access to crypto markets. CoinBowl enables users to trade large amounts of crypto at great prices. Users can buy or sell an uncapped quantity of crypto with 1 price for 1 order.<br /><br />This movement is expected to continue our run of success in other fields and transform Shanzhai into a diversified investment company. We also have offices in New York, California, Jakarta and Phnom Penh.<br /><br />COMPANY INFO:<br />Name: Shanzhai Limited<br />Mailing Address: Flat A, 18/F, 88 Commercial Building, 28-34 Wing Lok Street, Sheung Wan, Hong Kong<br />';


class About extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      locale: this.props.locale,
    };
  }

  componentDidMount() {
    const { locale } = this.props;
    this.props.getAboutContent({ params: { language: locale, page: 'about_us' } });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (JSON.stringify(nextProps.locale) !== JSON.stringify(prevState.locale)) {
      const { locale } = nextProps;
      nextProps.getAboutContent({ params: { language: locale, page: 'about_us' } });

      return { locale: nextProps.locale };
    }

    return null;
  }

  render() {
    const { aboutContent } = this.props;
    return (
      <div>
        {aboutContent && (
          <div>
            <h5 className={styles.pdFaq}>
              <LabelLang id="static_page.aboutUs" />
            </h5>
            <div className="container">
              <div className={styles.contactWrap} dangerouslySetInnerHTML={{ __html: aboutContent }} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapState = state => ({
  aboutContent: state.landingReducer.aboutContent,
  locale: state.langReducer.lang || FAIL_DEFAULT_LANGUAGE
});

const mapDispatch = dispatch => ({
  getAboutContent: bindActionCreators(getAboutContent, dispatch),
});

const connectedContactPage = connect(mapState, mapDispatch)(About);
export default connectedContactPage;
