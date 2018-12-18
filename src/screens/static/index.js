import React from 'react';
import { connect } from 'react-redux';
import { FAIL_DEFAULT_LANGUAGE } from 'src/resources/constants/languages';
import { getAboutContent } from 'src/screens/landingpage/redux/action';
import style from './styles.scss';

class StaticPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      locale: this.props.locale,
    };
  }

  componentDidMount() {
    const { locale, match } = this.props;
    this.props.getAboutContent({ params: { language: locale, page: match.params.id } });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (JSON.stringify(nextProps.locale) !== JSON.stringify(prevState.locale)) {
      const { locale } = nextProps;
      nextProps.getAboutContent({ params: { language: locale, page: nextProps.match.params.id } });

      return { locale: nextProps.locale };
    }

    return null;
  }

  render() {
    const { staticTitle, aboutContent } = this.props;
    return (
      <div>
        {aboutContent && (
          <div className={style.container}>
            <div className={style.title}>{staticTitle}</div>
            <div className={style.content} dangerouslySetInnerHTML={{ __html: aboutContent }} />
          </div>
        )}
      </div>
    );
  }
}

const mapState = state => ({
  aboutContent: state.landingReducer.aboutContent,
  staticTitle: state.landingReducer.staticTitle,
  locale: state.langReducer.lang || FAIL_DEFAULT_LANGUAGE
});

const mapDispatch = { getAboutContent };

export default connect(mapState, mapDispatch)(StaticPage);
