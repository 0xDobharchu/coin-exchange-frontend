import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getPromotionContent } from 'src/screens/landingpage/redux/action';
import LabelLang from 'src/lang/components/LabelLang';
import { FAIL_DEFAULT_LANGUAGE } from 'src/resources/constants/languages';
import styles from './styles.scss';

class PromotionProgram extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      locale: this.props.locale,
    };
  }

  componentDidMount() {
    const { locale } = this.props;
    this.props.getPromotionContent({ params: { language: locale, page: 'promotion_programs' } });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (JSON.stringify(nextProps.locale) !== JSON.stringify(prevState.locale)) {
      const { locale } = nextProps;
      nextProps.getPromotionContent({ params: { language: locale, page: 'promotion_programs' } });
      return { locale: nextProps.locale };
    }

    return null;
  }

  render() {
    const { promotionContent } = this.props;
    return (
      <div>
        {promotionContent && (
        <div>
          <h5 className={styles.pdFaq}>
            <LabelLang id="static_page.promotionPrograms" />
          </h5>
          <div className="container">
            <div className={styles.contactWrap} dangerouslySetInnerHTML={{ __html: promotionContent }} />
          </div>
        </div>
        )}
      </div>
    );
  }
}

const mapState = state => ({
  promotionContent: state.landingReducer.promotionContent,
  locale: state.langReducer.lang || FAIL_DEFAULT_LANGUAGE
});

const mapDispatch = dispatch => ({
  getPromotionContent: bindActionCreators(getPromotionContent, dispatch),
});

export default connect(mapState, mapDispatch)(PromotionProgram);
