import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getPrivacyContent, getUserAgreementContent } from 'src/screens/landingpage/redux/action';
import LabelLang from 'src/lang/components/LabelLang';
import { FAIL_DEFAULT_LANGUAGE } from 'src/resources/constants/languages';
import styles from './styles.scss';

class AgreementPrivacy extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      locale: this.props.locale,
    };
  }

  componentDidMount() {
    const { locale } = this.props;
    this.props.getUserAgreementContent({ params: { language: locale, page: 'agreement' } });
    this.props.getPrivacyContent({ params: { language: locale, page: 'privacy' } });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (JSON.stringify(nextProps.locale) !== JSON.stringify(prevState.locale)) {
      const { locale } = nextProps;
      nextProps.getUserAgreementContent({ params: { language: locale, page: 'agreement' } });
      nextProps.getPrivacyContent({ params: { language: locale, page: 'privacy' } });
      return { locale: nextProps.locale };
    }

    return null;
  }

  render() {
    const { userAgreementContent, privacyContent } = this.props;
    return (
      <div >
        {userAgreementContent && (
          <div className={styles.container}>
            <div className={styles.titleContainer}>
              <div className="container">
                <div className={styles.title}><LabelLang id="static_page.userAgreement" /></div>
              </div>
            </div>
            <div className="container">
              <div className={styles.content} dangerouslySetInnerHTML={{ __html: userAgreementContent }} />
            </div>
          </div>
        )}

        {privacyContent && (
          <div className={styles.container}>
            <div className={styles.titleContainer}>
              <div className="container">
                <div className={styles.title} style={{ paddingTop: '20px' }}><LabelLang id="static_page.privacyPolicy" /></div>
              </div>
            </div>
            <div className="container">
              <div className={styles.content} dangerouslySetInnerHTML={{ __html: privacyContent }} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapState = state => ({
  userAgreementContent: state.landingReducer.userAgreementContent,
  privacyContent: state.landingReducer.privacyContent,
  locale: state.langReducer.lang || FAIL_DEFAULT_LANGUAGE
});

const mapDispatch = dispatch => ({
  getUserAgreementContent: bindActionCreators(getUserAgreementContent, dispatch),
  getPrivacyContent: bindActionCreators(getPrivacyContent, dispatch),
});

export default connect(mapState, mapDispatch)(AgreementPrivacy);
