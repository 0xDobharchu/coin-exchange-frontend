import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LabelLang from 'src/lang/components/LabelLang';
import { FAIL_DEFAULT_LANGUAGE } from 'src/resources/constants/languages';
import Faq from 'src/components/FAQ/';
import { getFaqContent } from './redux/action';
import styles from './styles.scss';

class CoinBowlFAQ extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      locale: this.props.locale,
    };
  }

  componentDidMount() {
    const { locale } = this.props;
    const params = { language: locale };
    this.props.getFaqContent({ params });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (JSON.stringify(nextProps.locale) !== JSON.stringify(prevState.locale)) {
      const params = { language: nextProps.locale };
      nextProps.getFaqContent({ params });
      return { locale: nextProps.locale };
    }

    return null;
  }

  render() {
    const {
      faqContent
    } = this.props;

    return (
      <div>
        {faqContent && (
          <div className={styles.container}>
            <div className={styles.title}><LabelLang id="COIN_EXCHANGE_LP_FAQ_TITLE" /></div>
            <div className={styles.content}>
              <Faq faq={faqContent} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapState = state => ({
  faqContent: state.landingReducer.faqContent,
  locale: state.langReducer.lang || FAIL_DEFAULT_LANGUAGE
});

const mapDispatch = dispatch => ({
  getFaqContent: bindActionCreators(getFaqContent, dispatch),
});

export default connect(mapState, mapDispatch)(CoinBowlFAQ);
