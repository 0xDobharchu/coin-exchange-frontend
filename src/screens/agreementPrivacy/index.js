import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getPrivacyContent, getUserAgreementContent } from 'src/screens/landingpage/redux/action';
import LabelLang from 'src/lang/components/LabelLang';
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
      <div>
        {userAgreementContent && (
        <div>
          <h5 className={styles.pdFaq}>
            <LabelLang id="static_page.userAgreement" />
          </h5>
          <div className="container">
            <div className={styles.contactWrap} dangerouslySetInnerHTML={{ __html: userAgreementContent }} />
          </div>
        </div>
        )}

        {privacyContent && (
        <div>
          <h5 className={styles.pdFaq}>
            <LabelLang id="static_page.privacyPolicy" />
          </h5>
          <div className="container">
            <div className={styles.contactWrap} dangerouslySetInnerHTML={{ __html: privacyContent }} />
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
  locale: state?.app.locale || 'en',
});

const mapDispatch = dispatch => ({
  getUserAgreementContent: bindActionCreators(getUserAgreementContent, dispatch),
  getPrivacyContent: bindActionCreators(getPrivacyContent, dispatch),
});

export default connect(mapState, mapDispatch)(AgreementPrivacy);
